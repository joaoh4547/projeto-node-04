import { AnswersRepository } from "../repositories/answers-repository";
import { AnswerQuestionUseCase } from "./answer-question";


const fakeAnswersRepository : AnswersRepository = {
    create: async (answer) => {
    }
};


test("create an answer", async () => {
    const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);

    const {answer} =  await answerQuestion.handle({
        questionId: "1",
        instructorId: "1",
        content: "This is an answer",
    });

    expect(answer.content).toEqual("This is an answer");
  
});