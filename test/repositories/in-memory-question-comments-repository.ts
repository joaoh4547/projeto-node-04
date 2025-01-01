import { QuestionsCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionsCommentsRepository implements QuestionsCommentsRepository{
    comments: QuestionComment[] = [];
  
    async create(questionComment: QuestionComment) {
        this.comments.push(questionComment);
    }
}