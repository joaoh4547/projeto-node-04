import { AnswersCommentsRepository } from "@/domain/forum/application/repositories/answers-comments-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export class InMemoryAnswersCommentsRepository implements AnswersCommentsRepository{
    comments: AnswerComment[] = [];
  
    async create(answerComment: AnswerComment) {
        this.comments.push(answerComment);
    }
}