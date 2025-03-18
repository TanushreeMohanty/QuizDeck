import { useState } from "react";

export default function QuizMode({ flashcards }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [score, setScore] = useState(0);

  const handleNext = () => {
    setFlipped(false);
    if (index < flashcards.length - 1) {
      setIndex(index + 1);
    } else {
      alert(`Quiz Completed! Your Score: ${score}/${flashcards.length}`);
      setIndex(0);
      setScore(0);
    }
  };

  const handleCorrect = () => {
    setScore(score + 1);
    handleNext();
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Quiz Mode</h2>
      <p className="text-gray-600">Progress: {index + 1} / {flashcards.length}</p>

      {/* Flashcard Display */}
      <div
        className="relative w-60 h-40 perspective-1000 cursor-pointer my-4"
        onClick={() => setFlipped(!flipped)}
      >
        <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${flipped ? "rotate-y-180" : ""}`}>
          {/* Front Side (Question) */}
          <div className="absolute w-full h-full bg-blue-500 text-white flex items-center justify-center p-4 rounded-lg shadow-lg backface-hidden">
            <h3 className="text-lg font-semibold text-center">{flashcards[index].question}</h3>
          </div>

          {/* Back Side (Answer) */}
          <div className="absolute w-full h-full bg-green-500 text-white flex items-center justify-center p-4 rounded-lg shadow-lg rotate-y-180 backface-hidden">
            <h3 className="text-lg font-semibold text-center">{flashcards[index].answer}</h3>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mt-3">
        <button className="btn btn-success" onClick={handleCorrect}>
          ✅ Correct
        </button>
        <button className="btn btn-error" onClick={handleNext}>
          ❌ Skip
        </button>
      </div>
    </div>
  );
}
