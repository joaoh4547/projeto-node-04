
import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

export interface EditAnswerUseCaseInputParams {
  answerId: string;
  authorId: string;
  content: string;
}

export interface EditAnswerUseCaseResult {
    answer: Answer
}

export class EditAnswerUseCase {

    constructor(private answersRepository: AnswersRepository) { }

    async handle({ answerId,authorId,content }: EditAnswerUseCaseInputParams): Promise<EditAnswerUseCaseResult> {
        const answer = await this.answersRepository.findById(answerId);

        if(!answer) {
            throw new Error("Answer not found.");
        }

        if(authorId !== answer.authorId.toString()) {
            throw new Error("Not Allowed.");
        }

        answer.content = content;

        await this.answersRepository.save(answer);
        return { answer };
    }
}
