import { UniqueEntityId } from "@/core/entities/value-objects/unique-entity-id";
import { makeAnswer } from "test/factories/make-answers";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { EditAnswerUseCase } from "./edit-answer";
import { NotAllowedError } from "./errors/not-allowed-error";

let sut: EditAnswerUseCase;
let answersRepository: InMemoryAnswersRepository;
describe("Edit Answer Use Case", () => {

    beforeEach(() => {
        answersRepository = new InMemoryAnswersRepository();
        sut = new EditAnswerUseCase(answersRepository);
    });

    it("should to able to edit a answer", async () => {
        const newAnswer = makeAnswer({ authorId: new UniqueEntityId("2") }, new UniqueEntityId("1"));
        await answersRepository.create(newAnswer);
        await sut.handle({
            answerId: newAnswer.id.toString(),
            authorId: "2",
            content: "New Content"
        });

        expect(answersRepository.answers[0]).toMatchObject({
            content: "New Content"
        });
    });


    it("should to not be able to edit a answer from another user", async () => {
        const newAnswer = makeAnswer({ authorId: new UniqueEntityId("2") }, new UniqueEntityId("1"));
        await answersRepository.create(newAnswer);
        const result = await sut.handle({
            answerId: newAnswer.id.toString(),
            authorId: "4",
            content: "New Content"
        });

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(NotAllowedError);
    });

});