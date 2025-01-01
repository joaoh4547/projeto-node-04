
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

export interface FetchRecentQuestionsUseCaseInputParams {
    page: number;
}

export interface FetchRecentQuestionsUseCaseResult {
    questions: Question[]
}

export class FetchRecentQuestionsUseCase {

    constructor(private questionsRepository: QuestionsRepository) { }

    async handle({ page }: FetchRecentQuestionsUseCaseInputParams): Promise<FetchRecentQuestionsUseCaseResult> {
        const questions = await this.questionsRepository.findManyRecent({ page });
        return { questions };
    }
}
