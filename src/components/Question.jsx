import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";


/**
 * 키 중복 문제 발생으로 인한 추가된 컴포넌트 
 * QuestionTimer 와 Answers 컴포넌트가 같이 랜더링되야하므로 묶었고 부모컴포넌트에서 키를 설정한다. 
 */
export default function Question({questionText, answers, onSelectAnswer, selectedAnswer, answerState, onSkipAnswer}) {
  return (
    <div id="question">
      {/* 
          "key 추가"
            Quiz 컴포넌트가 재랜더링 될 때마다, QuestionTimer 컴포넌트도 재랜더링 되기를 원해서 key 추가 
            key 로 인해 이전 컴포넌트는 삭제되고 새로운 컴포넌트가 생성된다. 
        */}
      <QuestionTimer
        // key={activeQuestionIndex}
        timeout={10000}
        onTimeOut={onSkipAnswer}
      />
      <h2>{questionText}</h2>
      <Answers
        // key={activeQuestionIndex}
        answers={answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelect={onSelectAnswer}
      />
    </div>
  );
}
