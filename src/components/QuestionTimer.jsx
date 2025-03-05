import { useEffect, useState } from "react";

export default function QuestionTimer({ onTimeOut, timeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    console.log("SETTING TIMEOUT");
    const timer = setTimeout(onTimeOut, timeout);
    return () => {
      clearTimeout(timer);
    }
  }, [timeout, onTimeOut]);

  useEffect(() => {
    console.log("SETTING INTERVAL");
    const interval = setInterval(() => {
      setRemainingTime((prev) => prev - 100);
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress id="question-time" value={remainingTime} max={timeout}></progress>
  );
}
