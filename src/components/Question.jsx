import { useState } from "react";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import QUESTIONS from "../questions.js";

/**
 * 키 중복 문제 발생으로 인한 추가된 컴포넌트
 * QuestionTimer 와 Answers 컴포넌트가 같이 랜더링되야하므로 묶었고 부모컴포넌트에서 키를 설정한다.
 */
export default function Question({
  index,
  onSelectAnswer,
  onSkipAnswer,
}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = 10000;
  if (answer.selectedAnswer) {
    timer = 1000;
  }
  if (answer.isCorrect !== null) {
    timer = 2000;
  }


  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null
    })

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer
      })

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000)

    }, 1000)
  }

  let answerState = '';
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  } else if (answer.selectedAnswer) {
    answerState = 'answered';
  }

  return (
    <div id="question">
      {/* 
          "key 추가"
            Quiz 컴포넌트가 재랜더링 될 때마다, QuestionTimer 컴포넌트도 재랜더링 되기를 원해서 key 추가 
            key 로 인해 이전 컴포넌트는 삭제되고 새로운 컴포넌트가 생성된다. 
        */}
      <QuestionTimer
        // key={activeQuestionIndex}
        key={timer}
        timeout={timer}
        onTimeOut={answer.selectedAnswer === '' ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        // key={activeQuestionIndex}
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
