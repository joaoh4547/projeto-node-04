import { AnswersCommentsRepository } from "@/domain/forum/application/repositories/answers-comments-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export class InMemoryAnswersCommentsRepository implements AnswersCommentsRepository{
    comments: AnswerComment[] = [];
  
    async create(answerComment: AnswerComment) {
        this.comments.push(answerComment);
    }

    async findById(id: string) {
        return this.comments.find(comment => comment.id.toString() === id) || null;
    }

    async delete(answerComment: AnswerComment) {
        this.comments = this.comments.filter(c => c.id !== answerComment.id);
    }
}