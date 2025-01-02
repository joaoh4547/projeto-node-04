
import { Either, left, right } from "@/core/either";
import { Question } from "../../enterprise/entities/question";
import { AnswersRepository } from "../repositories/answers-repository";
import { QuestionsRepository } from "../repositories/questions-repository";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

export interface ChooseQuestionBestAnswerUseCaseInputParams {
    authorId: string;
    answerId: string;
}

export type ChooseQuestionBestAnswerUseCaseResult = Either<ResourceNotFoundError | NotAllowedError, {
    question: Question
}>

export class ChooseQuestionBestAnswerUseCase {

    constructor(private answersRepository: AnswersRepository, private questionsRepository: QuestionsRepository) { }

    async handle({ authorId, answerId }: ChooseQuestionBestAnswerUseCaseInputParams): Promise<ChooseQuestionBestAnswerUseCaseResult> {
        const answer = await this.answersRepository.findById(answerId);

        if (!answer) {
            throw new Error("Answer not found.");
        }

        const question = await this.questionsRepository.findById(answer.questionId.toString());

        if (!question) {
            return left(new ResourceNotFoundError());
        }

        if (authorId !== question.authorId.toString()) {
            return left(new NotAllowedError());
        }

        question.bestAnswerId = answer.id;

        await this.questionsRepository.save(question);
        return right({ question }); 
    }
}
