import { makeAnswer } from "test/factories/make-answers";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { FetchQuestionsAnswersUseCase } from "./fetch-question-answers";

let answersRepository: InMemoryAnswersRepository;
let sut: FetchQuestionsAnswersUseCase;

describe("Fetch  Questions Answers Use Case", () => {
    beforeEach(() => {
        answersRepository = new InMemoryAnswersRepository();
        sut = new FetchQuestionsAnswersUseCase(answersRepository);
    });

    it("should be able to fetch question answers", async () => {
        await answersRepository.create(makeAnswer());
        await answersRepository.create(makeAnswer());
        await answersRepository.create(makeAnswer());
        await answersRepository.create(makeAnswer());

        const { answers } = await sut.handle({questionId: "1", page: 1});
        expect(answers).toHaveLength(4);

    });


    it("should be able to fetch paginated question answers", async () => {
        for(let i = 0; i < 22; i++){
            await answersRepository.create(makeAnswer());
        }
        const { answers } = await sut.handle({questionId: "1", page: 2});
        expect(answers).toHaveLength(2);
    });


});