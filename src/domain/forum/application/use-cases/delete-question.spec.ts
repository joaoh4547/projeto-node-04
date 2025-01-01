import { UniqueEntityId } from "@/core/entities/value-objects/unique-entity-id";
import { makeQuestion } from "test/factories/make-questions";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { DeleteQuestionUseCase } from "./delete-question";

let sut: DeleteQuestionUseCase;
let questionsRepository: InMemoryQuestionsRepository; 
describe("Delete Question Use Case", () => {

    beforeEach(() => {
        questionsRepository = new InMemoryQuestionsRepository();
        sut = new DeleteQuestionUseCase(questionsRepository);
    });

    it("should to able to delete a question", async () => {
        const newQuestion = makeQuestion({authorId: new UniqueEntityId("2")}, new UniqueEntityId("1"));
        await questionsRepository.create(newQuestion);
        await sut.handle({questionId: newQuestion.id.toString(),authorId: "2"});

        expect(questionsRepository.questions).toHaveLength(0);
    });


    it("should to not be able to delete a question from another user", async () => {
        const newQuestion = makeQuestion({authorId: new UniqueEntityId("2")}, new UniqueEntityId("1"));
        await questionsRepository.create(newQuestion);
        await expect(() =>{
            return sut.handle({questionId: newQuestion.id.toString(),authorId: "4"});
        }).rejects.toBeInstanceOf(Error);
    });

});