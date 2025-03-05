import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import quizCompletedImage from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("");
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1; // 답 선택 후, 현재 문제애서 1초 머물러야 하기 때문에 -1
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
  

  /* useCallback 을 사용하여 랜더링 시 새로운 함수 재생성 막음 */
  const handleClickAnswer = useCallback(
    function handleClickAnswer(selectedAnswer) {
      setAnswerState("answered");
      setUserAnswers((prevAnswers) => {
        return [...prevAnswers, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState(""); // 다음 문제로 넘어가기 위해 초기화
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(() => handleClickAnswer(null), []);

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompletedImage} alt="quiz done"></img>
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question 
        key={activeQuestionIndex}
        questionText={QUESTIONS[activeQuestionIndex].text} 
        answers={QUESTIONS[activeQuestionIndex].answers} 
        onSelectAnswer={handleClickAnswer}
        answerState={answerState}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
