import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
    questions: Question[] = [];

    async create(question: Question) {
        this.questions.push(question);
    }

    async findBySlug(slug: string) {
        return this.questions.find(question => question.slug.value === slug) || null;
    }

    async findById(id: string) {
        return this.questions.find(question => question.id.toString() === id) || null;  
    }

    async delete(question: Question) {
        this.questions = this.questions.filter(q => q.id!== question.id);
    }
  
}