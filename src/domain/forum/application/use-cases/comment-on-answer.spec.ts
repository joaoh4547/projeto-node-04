import { makeAnswer } from "test/factories/make-answers";
import { InMemoryAnswersCommentsRepository } from "test/repositories/in-memory-answers-comments-repository";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { CommentOnAnswerUseCase } from "./comment-on-answer";

let answersRepository: InMemoryAnswersRepository;
let answerCommentsRepository: InMemoryAnswersCommentsRepository;
let sut: CommentOnAnswerUseCase;


describe("Comment on Answer Use Case", () => {

    beforeEach(() => {
        answersRepository = new InMemoryAnswersRepository();
        answerCommentsRepository = new InMemoryAnswersCommentsRepository();
        sut = new CommentOnAnswerUseCase(
            answersRepository,
            answerCommentsRepository
        );
    });

    it("should be able to comment on answer", async () => {
        const newAnswer = makeAnswer();
        await answersRepository.create(newAnswer);

        await sut.handle({
            answerId: newAnswer.id.toString(),
            authorId: "1",
            content: "New Comment"
        });
        expect(answerCommentsRepository.comments[0].content).toEqual("New Comment");
    });

  
});

