
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswersCommentsRepository } from "../repositories/answers-comments-repository";

export interface FetchAnswerCommentsUseCaseInputParams {
  page: number;
  answerId: string;
}

export interface FetchAnswerCommentsUseCaseResult {
  comments: AnswerComment[]
}

export class FetchAnswerCommentsUseCase {

    constructor(private answerRepository: AnswersCommentsRepository) { }

    async handle({ page, answerId }: FetchAnswerCommentsUseCaseInputParams): Promise<FetchAnswerCommentsUseCaseResult> {
        const comments = await this.answerRepository.findManyByAnswerId(answerId,{ page });
        return { comments };
    }
}
