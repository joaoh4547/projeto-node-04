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
        const {question} = await sut.handle({authorId: "1", title: "Title", content: "Content"});
        expect(question.id).toBeTruthy();
        expect(questionsRepository.questions[0].id).toEqual(question.id);
    });

});

