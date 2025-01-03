
import { Either, left, right } from "@/core/either";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { QuestionsCommentsRepository } from "../repositories/question-comments-repository";

export interface DeleteQuestionCommentUseCaseInputParams {
  authorId: string;
  questionCommentId: string;
}

export type DeleteQuestionCommentUseCaseResult = Either<ResourceNotFoundError| NotAllowedError,{}>

export class DeleteQuestionCommentUseCase {

    constructor(private questionCommentsRepository: QuestionsCommentsRepository) { }

    async handle({ authorId,questionCommentId }: DeleteQuestionCommentUseCaseInputParams): Promise<DeleteQuestionCommentUseCaseResult> {
        const questionComment = await this.questionCommentsRepository.findById(questionCommentId);

        if (!questionComment) {
            return left(new ResourceNotFoundError());
        }

        if(authorId !== questionComment.authorId.toString()) {
            return left(new NotAllowedError());
        }

        await this.questionCommentsRepository.delete(questionComment);
        return right({});
    }
}
