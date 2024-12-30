import { makeQuestion } from "test/factories/make-questions";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
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
        
        await  questionsRepository.create(makeQuestion({
            slug: Slug.create("title-test")
        }));
        const {question} = await sut.handle({slug: "title-test"});
        expect(question.id).toBeTruthy();
    });
});