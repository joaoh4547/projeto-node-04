
import { UniqueEntityId } from "@/core/entities/value-objects/unique-entity-id";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import { QuestionsCommentsRepository } from "../repositories/question-comments-repository";
import { QuestionsRepository } from "../repositories/questions-repository";

export interface CommentOnQuestionUseCaseInputParams {
  authorId: string;
  questionId: string;
  content: string;
}

export interface CommentOnQuestionUseCaseResult {
  questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {

    constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionsCommentsRepository
    ) { }

    async handle({ authorId, questionId, content }: CommentOnQuestionUseCaseInputParams): Promise<CommentOnQuestionUseCaseResult> {
        const question = await this.questionsRepository.findById(questionId);

        if (!question) {
            throw new Error("Question not found.");
        }

        const questionComment = QuestionComment.create({ authorId: new UniqueEntityId(authorId), content, questionId: new UniqueEntityId(questionId) });
        await this.questionCommentsRepository.create(questionComment);
        return { questionComment };
    }
}
