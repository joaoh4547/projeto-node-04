
import { Either, right } from "@/core/either";
import { UniqueEntityId } from "@/core/entities/value-objects/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

export interface CreateQuestionUseCaseInputParams {
  authorId: string;
  title: string;
  content: string;
}

export type CreateQuestionUseCaseResult = Either<null, {
  question: Question
}>

export class CreateQuestionUseCase {

    constructor(private questionsRepository: QuestionsRepository) { }

    async handle({ authorId, content, title }: CreateQuestionUseCaseInputParams): Promise<CreateQuestionUseCaseResult> {
        const question = Question.create({ authorId: new UniqueEntityId(authorId), content, title });
        await this.questionsRepository.create(question);
        return right({ question });
    }
}
