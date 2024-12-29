import { Answer } from "../entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

export interface AnswerQuestionUseCaseInputParams {
  instructorId: string;
  questionId: string;
  content: string;
}

export interface AnswerQuestionUseCaseResult {
  answer: Answer;
}

export class AnswerQuestionUseCase {

  constructor(private answersRepository: AnswersRepository) {}

  async handle({ instructorId, questionId, content }: AnswerQuestionUseCaseInputParams): Promise<AnswerQuestionUseCaseResult> {
    const answer = new Answer({ authorId: instructorId, questionId, content });
    await this.answersRepository.create(answer);
    return { answer };
  }
}
