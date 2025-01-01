
import { UniqueEntityId } from "@/core/entities/value-objects/unique-entity-id";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswersCommentsRepository } from "../repositories/answers-comments-repository";
import { AnswersRepository } from "../repositories/answers-repository";

export interface CommentOnAnswerUseCaseInputParams {
  authorId: string;
  answerId: string;
  content: string;
}

export interface CommentOnAnswerUseCaseResult {
  answerComment: AnswerComment
}

export class CommentOnAnswerUseCase {

    constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswersCommentsRepository
    ) { }

    async handle({ authorId, answerId, content }: CommentOnAnswerUseCaseInputParams): Promise<CommentOnAnswerUseCaseResult> {
        const answer = await this.answersRepository.findById(answerId);

        if (!answer) {
            throw new Error("Answer not found.");
        }

        const answerComment = AnswerComment.create({ authorId: new UniqueEntityId(authorId), content, answerId: new UniqueEntityId(answerId) });
        await this.answerCommentsRepository.create(answerComment);
        return { answerComment };
    }
}
