import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
    answers: Answer[] = [];

    async create(answer: Answer) {
        this.answers.push(answer);
    }
   
    async delete(answer: Answer){
        this.answers = this.answers.filter(a => a.id !== answer.id);
    }

    async findById(id: string) {
        return this.answers.find(answer => answer.id.toString() === id) || null;
    }

    async save(answer: Answer) {
        const answerIndex = this.answers.findIndex(a => a.id === answer.id);
        this.answers[answerIndex] = answer;
    }
}