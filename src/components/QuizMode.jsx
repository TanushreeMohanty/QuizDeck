import { useState, useEffect } from "react";

export default function QuizMode({ flashcards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [shuffledFlashcards, setShuffledFlashcards] = useState([]);

  useEffect(() => {
    // Filter flashcards that have MCQ options and shuffle them
    const mcqFlashcards = flashcards.filter(fc => fc.options && fc.options.length > 0);
    setShuffledFlashcards([...mcqFlashcards].sort(() => Math.random() - 0.5));
  }, [flashcards]);

  const handleAnswer = (option) => {
    if (option === shuffledFlashcards[currentIndex].answer) {
      setScore(score + 1);
    }
    setSelectedAnswer(option);

    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentIndex + 1 < shuffledFlashcards.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        alert(`🎉 Quiz Completed! Your Score: ${score + 1}/${shuffledFlashcards.length}`);
        setCurrentIndex(0);
        setScore(0);
      }
    }, 1000);
  };

  if (shuffledFlashcards.length === 0) {
    return <p className="text-center text-gray-500">No multiple-choice flashcards available.</p>;
  }

  const { question, options } = shuffledFlashcards[currentIndex];

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-5">
      <h2 className="text-xl font-bold mb-4">Quiz Mode 📝</h2>
      <p className="text-lg font-semibold mb-3">{question}</p>

      <div className="grid gap-3">
        {options.map((option, idx) => (
          <button
            key={idx}
            className={`btn w-full ${selectedAnswer === option 
              ? (option === shuffledFlashcards[currentIndex].answer ? "btn-success" : "btn-error") 
              : "btn-outline"}`}
            onClick={() => handleAnswer(option)}
            disabled={selectedAnswer !== null}
          >
            {option}
          </button>
        ))}
      </div>

      <p className="mt-4 text-gray-600">Score: {score}/{shuffledFlashcards.length}</p>
    </div>
  );
}
