
import { QuestionsCommentsRepository } from "../repositories/question-comments-repository";

export interface DeleteQuestionCommentUseCaseInputParams {
  authorId: string;
  questionCommentId: string;
}

export interface DeleteQuestionCommentUseCaseResult {
  
}

export class DeleteQuestionCommentUseCase {

    constructor(private questionCommentsRepository: QuestionsCommentsRepository) { }

    async handle({ authorId,questionCommentId }: DeleteQuestionCommentUseCaseInputParams): Promise<DeleteQuestionCommentUseCaseResult> {
        const questionComment = await this.questionCommentsRepository.findById(questionCommentId);

        if (!questionComment) {
            throw new Error("Question not found.");
        }

        if(authorId !== questionComment.authorId.toString()) {
            throw new Error("Not Allowed.");
        }

        await this.questionCommentsRepository.delete(questionComment);
        return {  };
    }
}
