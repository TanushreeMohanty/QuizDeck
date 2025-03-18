import { useState, useEffect } from "react";

export default function QuizMode({ flashcards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);

  useEffect(() => {
    if (timeLeft === 0) {
      handleAnswer(false); // Auto-mark incorrect if time runs out
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (isCorrect) => {
    setTotalAnswered((prev) => prev + 1);
    
    if (isCorrect) {
      setScore((prev) => prev + 10); // Each correct answer = +10 points
      setCorrectCount((prev) => prev + 1);
    } else {
      setIncorrectCount((prev) => prev + 1);
    }

    nextQuestion();
  };

  const nextQuestion = () => {
    setShowAnswer(false);
    setTimeLeft(10);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const accuracy = totalAnswered > 0 ? ((correctCount / totalAnswered) * 100).toFixed(2) : 0;

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
            {showAnsswer ? "Hide Answer" : "Show Answer"}
          </button>

          {/* Timer UI */}
          <div className="mt-4">
            <p className="text-sm text-gray-600">Time Left: {timeLeft}s</p>
            <progress className="progress progress-primary w-full" value={timeLeft} max="10"></progress>
          </div>

          {/* Answer Buttons */}
          <div className="mt-4 flex gap-4 justify-center">
            <button className="btn btn-success" onClick={() => handleAnswer(true)}>✅ Correct</button>
            <button className="btn btn-error" onClick={() => handleAnswer(false)}>❌ Incorrect</button>
          </div>

          {/* Score & Progress */}
          <div className="mt-6 p-4 bg-gray-100 rounded-lg w-full">
            <h3 className="font-bold text-lg text-blue-600">📊 Progress</h3>
            <p>Score: <span className="font-semibold">{score}</span></p>
            <p>Correct: <span className="text-green-600">{correctCount}</span></p>
            <p>Incorrect: <span className="text-red-600">{incorrectCount}</span></p>
            <p>Accuracy: <span className="text-purple-600">{accuracy}%</span></p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No flashcards available!</p>
      )}
    </div>
  );
}
