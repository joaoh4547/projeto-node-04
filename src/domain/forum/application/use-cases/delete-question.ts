
import { QuestionsRepository } from "../repositories/questions-repository";

export interface DeleteQuestionUseCaseInputParams {
  questionId: string;
  authorId: string;
}

export interface DeleteQuestionUseCaseResult {
}

export class DeleteQuestionUseCase {

    constructor(private questionsRepository: QuestionsRepository) { }

    async handle({ questionId,authorId }: DeleteQuestionUseCaseInputParams): Promise<DeleteQuestionUseCaseResult> {
        const question = await this.questionsRepository.findById(questionId);

        if(!question) {
            throw new Error("Question not found.");
        }

        if(authorId !== question.authorId.toString()) {
            throw new Error("Not Allowed.");
        }

        await this.questionsRepository.delete(question);
        return {  };
    }
}
