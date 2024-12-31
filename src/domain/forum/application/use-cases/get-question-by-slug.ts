
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

export interface GetQuestionBySlugUseCaseInputParams {
 slug: string
}

export interface GetQuestionBySlugUseCaseResult {
  question: Question
}

export class GetQuestionBySlugUseCase {

    constructor(private questionsRepository: QuestionsRepository) { }

    async handle({ slug }: GetQuestionBySlugUseCaseInputParams): Promise<GetQuestionBySlugUseCaseResult> {
        const question = await this.questionsRepository.findBySlug(slug);
        if(!question) {
            throw new Error("Question not found");
        }
        return { question };
    }
}
