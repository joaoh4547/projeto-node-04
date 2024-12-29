import { Answer } from "../entities/answer";

export interface AnswerQuestionUseCaseInputParams {
  instructorId: string;
  questionId: string;
  content: string;
}

export interface AnswerQuestionUseCaseResult {
  answer: Answer;
}

export class AnswerQuestionUseCase {
  handle({instructorId,questionId,content}: AnswerQuestionUseCaseInputParams): AnswerQuestionUseCaseResult {
    const answer = new Answer(content);
    return {answer};
  }
}
