import { UniqueEntityId } from "@/core/entities/value-objects/unique-entity-id";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { Question } from "../../enterprise/entities/question";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";

let questionsRepository: InMemoryQuestionsRepository;
let sut : GetQuestionBySlugUseCase;

describe("Get Question By Slug Use Case", () => {
    beforeEach(() => {
        questionsRepository = new InMemoryQuestionsRepository();
        sut = new GetQuestionBySlugUseCase(questionsRepository);
    });

    it("should be able to get a question by its slug", async () => {
        
        await  questionsRepository.create(Question.create({
            authorId: new UniqueEntityId("1"),
            title: "Title",
            content: "Content",
            slug: Slug.create("title-test")
        }));
        const {question} = await sut.handle({slug: "title-test"});
        expect(question.id).toBeTruthy();
    });
});