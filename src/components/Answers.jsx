/**
 * 섞인 답변의 목록을 출력하는 컴포넌트
 */

import { useRef } from "react";
export default function Answers({ answers, selectedAnswer, answerState, onSelect }) {

  const shuffledAnswers = useRef();

  // answerState 상태값이 변경될 때마다 답변들이 섞이는 문제 발생 -> useRef 사용하여 해결
  // useRef: 컴포넌트가 재랜더링 되어도 값이 초기화 되지 않는다.
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5); // Math.random(): 0 ~ 1 사이의 난수를 반환 (양수: 오름차순, 음수:내림차순)
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let cssClass = "";

        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }

        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelect(answer)}
              className={cssClass}
              disabled={answerState !== ''}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
