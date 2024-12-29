
import { UniqueEntityId } from "@/core/entities/value-objects/unique-entity-id";
import { Answer } from "../../enterprise/entities/answer";
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

    constructor(private answersRepository: AnswersRepository) { }

    async handle({ instructorId, questionId, content }: AnswerQuestionUseCaseInputParams): Promise<AnswerQuestionUseCaseResult> {
        const answer = Answer.create({
            content,
            authorId: new UniqueEntityId(instructorId),
            questionId: new UniqueEntityId(questionId),
        });
    
        await this.answersRepository.create(answer);
        return { answer };
    }
}
