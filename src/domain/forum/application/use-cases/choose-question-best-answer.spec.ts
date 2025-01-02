import { UniqueEntityId } from "@/core/entities/value-objects/unique-entity-id";
import { makeAnswer } from "test/factories/make-answers";
import { makeQuestion } from "test/factories/make-questions";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer";
import { NotAllowedError } from "./errors/not-allowed-error";

let questionsRepository: InMemoryQuestionsRepository;
let answersRepository: InMemoryAnswersRepository;
let sut: ChooseQuestionBestAnswerUseCase;


describe("Choose Question Best Answer Use Case", () => {

    beforeEach(() => {
        questionsRepository = new InMemoryQuestionsRepository();
        answersRepository = new InMemoryAnswersRepository();
        sut = new ChooseQuestionBestAnswerUseCase(
            answersRepository,
            questionsRepository
        );
    });

    it("should be able to choose the question best answer", async () => {
        const newQuestion = makeQuestion();
        const newAnswer = makeAnswer({
            questionId: newQuestion.id
        });
        await questionsRepository.create(newQuestion);
        await answersRepository.create(newAnswer);

        await sut.handle({
            answerId: newAnswer.id.toString(),
            authorId: newQuestion.authorId.toString()
        });

        expect(questionsRepository.questions[0].bestAnswerId).toEqual(newAnswer.id);
    });

    it("should not be able to choose another user question best answer", async () => {
        const newQuestion = makeQuestion({ authorId: new UniqueEntityId("2") });
        const newAnswer = makeAnswer({
            questionId: newQuestion.id
        });
        await questionsRepository.create(newQuestion);
        await answersRepository.create(newAnswer);

        const result = await  sut.handle({
            answerId: newAnswer.id.toString(),
            authorId: "3"
        });

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(NotAllowedError);
    });

});

