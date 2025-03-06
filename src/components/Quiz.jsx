import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import quizCompletedImage from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
  

  /* useCallback 을 사용하여 랜더링 시 새로운 함수 재생성 막음 */
  const handleClickAnswer = useCallback(
    function handleClickAnswer(selectedAnswer) {
      setUserAnswers((prevAnswers) => {
        return [...prevAnswers, selectedAnswer];
      });
    }, []
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
        index={activeQuestionIndex}
        onSelectAnswer={handleClickAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
