import { useState, useEffect } from "react";

export default function QuizMode({ flashcards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10); // Timer starts from 10 seconds

  useEffect(() => {
    if (timeLeft === 0) {
      nextQuestion();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const nextQuestion = () => {
    setShowAnswer(false);
    setTimeLeft(10); // Reset timer for next question
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  return (
    <div className="flex flex-col items-center">
      {flashcards.length > 0 ? (
        <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center relative">
          <h2 className="text-lg font-bold mb-4">{flashcards[currentIndex].question}</h2>

          {showAnswer ? (
            <p className="text-green-600 font-semibold">{flashcards[currentIndex].answer}</p>
          ) : (
            <p className="text-gray-400 italic">Tap to reveal the answer</p>
          )}

          <button className="btn btn-accent mt-4" onClick={() => setShowAnswer(!showAnswer)}>
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>

          {/* Timer UI */}
          <div className="mt-4">
            <p className="text-sm text-gray-600">Time Left: {timeLeft}s</p>
            <progress className="progress progress-primary w-full" value={timeLeft} max="10"></progress>
          </div>

          <button className="btn btn-primary mt-4" onClick={nextQuestion}>
            Skip ➡️
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-500">No flashcards available!</p>
      )}
    </div>
  );
}
