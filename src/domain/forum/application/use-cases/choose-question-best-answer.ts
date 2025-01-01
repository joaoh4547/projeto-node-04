
import { Question } from "../../enterprise/entities/question";
import { AnswersRepository } from "../repositories/answers-repository";
import { QuestionsRepository } from "../repositories/questions-repository";

export interface ChooseQuestionBestAnswerUseCaseInputParams {
  authorId: string;
  answerId: string;
}

export interface ChooseQuestionBestAnswerUseCaseResult {
  question: Question
}

export class ChooseQuestionBestAnswerUseCase {

    constructor(private answersRepository: AnswersRepository,private questionsRepository: QuestionsRepository) { }

    async handle({ authorId, answerId }: ChooseQuestionBestAnswerUseCaseInputParams): Promise<ChooseQuestionBestAnswerUseCaseResult> {
        const answer = await this.answersRepository.findById(answerId);

        if(!answer) {
            throw new Error("Answer not found.");
        }

        const question = await this.questionsRepository.findById(answer.questionId.toString());

        if(!question) {
            throw new Error("Question not found.");
        }

        if(authorId !== question.authorId.toString()) {
            throw new Error("Not Allowed.");
        }

        question.bestAnswerId = answer.id;

        await this.questionsRepository.save(question);
        return { question };
    }
}
