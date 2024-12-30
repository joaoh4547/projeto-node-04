import { UniqueEntityId } from "@/core/entities/value-objects/unique-entity-id";
import { Question, QuestionProps } from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";

export function makeQuestion(override:Partial<QuestionProps> = {}): Question {
    const question = Question.create({
        authorId: new UniqueEntityId("1"),
        title: "Title",
        content: "Content",
        slug: Slug.create("title-test"),
        ...override
    });

    return question;
}