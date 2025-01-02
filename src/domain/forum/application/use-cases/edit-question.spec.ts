import { UniqueEntityId } from "@/core/entities/value-objects/unique-entity-id";
import { makeQuestionAttachment } from "test/factories/make-question-attachment";
import { makeQuestion } from "test/factories/make-questions";
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { EditQuestionUseCase } from "./edit-question";
import { NotAllowedError } from "./errors/not-allowed-error";

let sut: EditQuestionUseCase;
let questionsRepository: InMemoryQuestionsRepository;
let questionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
describe("Edit Question Use Case", () => {

    beforeEach(() => {
        questionsRepository = new InMemoryQuestionsRepository();
        questionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
        sut = new EditQuestionUseCase(questionsRepository,questionAttachmentsRepository);
    });

    it("should to able to edit a question", async () => {
        const newQuestion = makeQuestion({ authorId: new UniqueEntityId("2") }, new UniqueEntityId("1"));
        await questionsRepository.create(newQuestion);

        questionAttachmentsRepository.attachments.push(
            makeQuestionAttachment({
                attachmentId: new UniqueEntityId("1"),
                questionId: newQuestion.id
            }),
            makeQuestionAttachment({
                attachmentId: new UniqueEntityId("2"),
                questionId: newQuestion.id
            }),
        );

        await sut.handle({
            questionId: newQuestion.id.toString(),
            authorId: "2",
            title: "New Title", 
            content: "New Content",
            attachmentsIds: ["1","3"]
        });

        expect(questionsRepository.questions[0]).toMatchObject({
            title: "New Title", 
            content: "New Content"
        });

        expect(questionsRepository.questions[0].attachments.currentItems).toHaveLength(2);
        expect(questionsRepository.questions[0].attachments.currentItems).toEqual([
            expect.objectContaining({ attachmentId: new UniqueEntityId("1") }),
            expect.objectContaining({ attachmentId: new UniqueEntityId("3") })
        ]);
    });


    it("should to not be able to edit a question from another user", async () => {
        const newQuestion = makeQuestion({ authorId: new UniqueEntityId("2") }, new UniqueEntityId("1"));
        await questionsRepository.create(newQuestion);


        const result = await sut.handle({
            questionId: newQuestion.id.toString(),
            authorId: "4",
            title: "New Title",
            content: "New Content",
            attachmentsIds: []
        });
       

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(NotAllowedError);
    });

});