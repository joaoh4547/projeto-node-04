import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { CreateQuestionUseCase } from "./create-question";

let questionsRepository: InMemoryQuestionsRepository;
let sut : CreateQuestionUseCase;


describe("Create Question Use Case", () => {

    beforeEach(() => {
        questionsRepository = new InMemoryQuestionsRepository();
        sut = new CreateQuestionUseCase(questionsRepository);
    });

    it("should be able to create a question", async () => {
        const result = await sut.handle({authorId: "1", title: "Title", content: "Content"});
        expect(result.isRight()).toBe(true);
        expect(questionsRepository.questions[0]).toEqual(result.value?.question);
    });

});

