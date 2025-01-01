import { UniqueEntityId } from "@/core/entities/value-objects/unique-entity-id";
import { makeQuestion } from "test/factories/make-questions";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { EditQuestionUseCase } from "./edit-question";

let sut: EditQuestionUseCase;
let questionsRepository: InMemoryQuestionsRepository;
describe("Edit Question Use Case", () => {

    beforeEach(() => {
        questionsRepository = new InMemoryQuestionsRepository();
        sut = new EditQuestionUseCase(questionsRepository);
    });

    it("should to able to edit a question", async () => {
        const newQuestion = makeQuestion({ authorId: new UniqueEntityId("2") }, new UniqueEntityId("1"));
        await questionsRepository.create(newQuestion);
        await sut.handle({
            questionId: newQuestion.id.toString(),
            authorId: "2",
            title: "New Title", 
            content: "New Content"
        });

        expect(questionsRepository.questions[0]).toMatchObject({
            title: "New Title", 
            content: "New Content"
        });
    });


    it("should to not be able to edit a question from another user", async () => {
        const newQuestion = makeQuestion({ authorId: new UniqueEntityId("2") }, new UniqueEntityId("1"));
        await questionsRepository.create(newQuestion);
        await expect(() => {
            return sut.handle({
                questionId: newQuestion.id.toString(),
                authorId: "4",
                title: "New Title",
                content: "New Content"
            });
        }).rejects.toBeInstanceOf(Error);
    });

});