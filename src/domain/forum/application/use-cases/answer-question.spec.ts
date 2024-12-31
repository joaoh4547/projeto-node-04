import { InMemoryAnswersRepository } from "test/repositories/in-memory-anwers-repository";
import { AnswerQuestionUseCase } from "./answer-question";

let answersRepository: InMemoryAnswersRepository;
let sut : AnswerQuestionUseCase;


describe("Answer Use Case", () => {

    beforeEach(() => {
        answersRepository = new InMemoryAnswersRepository();
        sut = new AnswerQuestionUseCase(answersRepository);
    });

    it("should be able to create an answer", async () => {
        const {answer} = await sut.handle({
            instructorId: "1",
            questionId: "1",
            content: "Content"
        });
        expect(answer.id).toBeTruthy();
        expect(answersRepository.answers[0].id).toEqual(answer.id);
    });

});

