import { UniqueEntityId } from "@/core/entities/value-objects/unique-entity-id";
import { makeAnswer } from "test/factories/make-answers";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { DeleteAnswerUseCase } from "./delete-answer";

let sut: DeleteAnswerUseCase;
let answersRepository: InMemoryAnswersRepository; 
describe("Delete Answer Use Case", () => {

    beforeEach(() => {
        answersRepository = new InMemoryAnswersRepository();
        sut = new DeleteAnswerUseCase(answersRepository);
    });

    it("should to able to delete a answer", async () => {
        const newAnswer = makeAnswer({authorId: new UniqueEntityId("2")}, new UniqueEntityId("1"));
        console.log(newAnswer);
        await answersRepository.create(newAnswer);
        await sut.handle({answerId: newAnswer.id.toString(),authorId: "2"});

        expect(answersRepository.answers).toHaveLength(0);
    });


    it("should to not be able to delete a answer from another user", async () => {
        const newAnswer = makeAnswer({authorId: new UniqueEntityId("2")}, new UniqueEntityId("1"));
        await answersRepository.create(newAnswer);
        await expect(() =>{
            return sut.handle({answerId: newAnswer.id.toString(),authorId: "4"});
        }).rejects.toBeInstanceOf(Error);
    });

});