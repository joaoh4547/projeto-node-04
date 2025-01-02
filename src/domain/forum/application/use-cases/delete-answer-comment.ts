
import { Either, left, right } from "@/core/either";
import { AnswersCommentsRepository } from "../repositories/answers-comments-repository";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

export interface DeleteAnswerCommentUseCaseInputParams {
  authorId: string;
  answerCommentId: string;
}

type DeleteAnswerCommentUseCaseResult =  Either<ResourceNotFoundError | NotAllowedError,{}>

export class DeleteAnswerCommentUseCase {

    constructor(private answerCommentsRepository: AnswersCommentsRepository) { }

    async handle({ authorId,answerCommentId }: DeleteAnswerCommentUseCaseInputParams): Promise<DeleteAnswerCommentUseCaseResult> {
        const answerComment = await this.answerCommentsRepository.findById(answerCommentId);

        if (!answerComment) {
            return left(new ResourceNotFoundError());
        }

        if(authorId !== answerComment.authorId.toString()) {
            return left(new NotAllowedError());
        }

        await this.answerCommentsRepository.delete(answerComment);
        return right({});
    }
}
