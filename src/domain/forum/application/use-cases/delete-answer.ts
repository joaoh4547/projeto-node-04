import { AnswersRepository } from "../repositories/answers-repository";

export interface DeleteAnswerUseCaseInputParams {
  answerId: string;
  authorId: string;
}

export interface DeleteAnswerUseCaseResult {
}

export class DeleteAnswerUseCase {

    constructor(private answersRepository: AnswersRepository) { }

    async handle({ answerId,authorId }: DeleteAnswerUseCaseInputParams): Promise<DeleteAnswerUseCaseResult> {
        const answer = await this.answersRepository.findById(answerId);

        if(!answer) {
            throw new Error("Answer not found.");
        }

        if(authorId !== answer.authorId.toString()) {
            throw new Error("Not Allowed.");
        }

        await this.answersRepository.delete(answer);
        return {  };
    }
}
