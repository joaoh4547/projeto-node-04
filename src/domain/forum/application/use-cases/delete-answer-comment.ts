
import { AnswersCommentsRepository } from "../repositories/answers-comments-repository";

export interface DeleteAnswerCommentUseCaseInputParams {
  authorId: string;
  answerCommentId: string;
}

export interface DeleteAnswerCommentUseCaseResult {
  
}

export class DeleteAnswerCommentUseCase {

    constructor(private answerCommentsRepository: AnswersCommentsRepository) { }

    async handle({ authorId,answerCommentId }: DeleteAnswerCommentUseCaseInputParams): Promise<DeleteAnswerCommentUseCaseResult> {
        const answerComment = await this.answerCommentsRepository.findById(answerCommentId);

        if (!answerComment) {
            throw new Error("Answer not found.");
        }

        if(authorId !== answerComment.authorId.toString()) {
            throw new Error("Not Allowed.");
        }

        await this.answerCommentsRepository.delete(answerComment);
        return {  };
    }
}
