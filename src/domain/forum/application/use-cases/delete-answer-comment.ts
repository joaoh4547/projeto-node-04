
import { Either, left, right } from "@/core/either";
import { AnswersCommentsRepository } from "../repositories/answers-comments-repository";

export interface DeleteAnswerCommentUseCaseInputParams {
  authorId: string;
  answerCommentId: string;
}

type DeleteAnswerCommentUseCaseResult =  Either<string,{}>

export class DeleteAnswerCommentUseCase {

    constructor(private answerCommentsRepository: AnswersCommentsRepository) { }

    async handle({ authorId,answerCommentId }: DeleteAnswerCommentUseCaseInputParams): Promise<DeleteAnswerCommentUseCaseResult> {
        const answerComment = await this.answerCommentsRepository.findById(answerCommentId);

        if (!answerComment) {
            return left("Answer Comment not found");
        }

        if(authorId !== answerComment.authorId.toString()) {
            return left("Not Allowed");
        }

        await this.answerCommentsRepository.delete(answerComment);
        return right({});
    }
}
