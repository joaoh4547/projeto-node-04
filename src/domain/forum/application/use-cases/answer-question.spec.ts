import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { AnswerQuestionUseCase } from "./answer-question";

let answersRepository: InMemoryAnswersRepository;
let sut : AnswerQuestionUseCase;


describe("Answer Use Case", () => {

    beforeEach(() => {
        answersRepository = new InMemoryAnswersRepository();
        sut = new AnswerQuestionUseCase(answersRepository);
    });

    it("should be able to create an answer", async () => {
        const result = await sut.handle({
            instructorId: "1",
            questionId: "1",
            content: "Content"
        }); 
        expect(result.isRight()).toBe(true);
        expect(answersRepository.answers[0]).toEqual(result.value?.answer);
    });

});

