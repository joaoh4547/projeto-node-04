import { expect, test } from 'vitest';
import { AnswerQuestionUseCase } from './answer-question';

test('create an answer', () => {
  const answerQuestion = new AnswerQuestionUseCase();

  const {answer} = answerQuestion.handle({
    questionId: '1',
    instructorId: '1',
    content: 'This is an answer',
  })

  expect(answer.content).toEqual('This is an answer');
  
})