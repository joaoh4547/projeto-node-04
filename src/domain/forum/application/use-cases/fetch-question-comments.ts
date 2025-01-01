
import { QuestionComment } from "../../enterprise/entities/question-comment";
import { QuestionsCommentsRepository } from "../repositories/question-comments-repository";

export interface FetchQuestionCommentsUseCaseInputParams {
  page: number;
  questionId: string;
}

export interface FetchQuestionCommentsUseCaseResult {
  comments: QuestionComment[]
}

export class FetchQuestionCommentsUseCase {

    constructor(private questionRepository: QuestionsCommentsRepository) { }

    async handle({ page, questionId }: FetchQuestionCommentsUseCaseInputParams): Promise<FetchQuestionCommentsUseCaseResult> {
        const comments = await this.questionRepository.findManyByQuestionId(questionId,{ page });
        return { comments };
    }
}
