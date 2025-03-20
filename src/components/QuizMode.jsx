import { useState, useEffect } from "react";

export default function QuizMode({ flashcards }) {
  const [playerName, setPlayerName] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Ask for player name only once
  useEffect(() => {
    if (!playerName) {
      const name = localStorage.getItem("playerName") || prompt("Enter your name for the leaderboard:");
      if (name) {
        setPlayerName(name);
        localStorage.setItem("playerName", name); // Store name to prevent re-prompting
      }
    }
  }, [playerName]);

  // Timer logic
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
      setScore((prev) => prev + 10); // Correct = +10 points
      setCorrectCount((prev) => prev + 1);
    } else {
      setIncorrectCount((prev) => prev + 1);
    }

    if (currentIndex === flashcards.length - 1) {
      setTimeout(() => {
        setQuizCompleted(true);
        saveScore(score + (isCorrect ? 10 : 0)); // Ensure correct final score
      }, 500);
    } else {
      nextQuestion();
    }
  };

  const nextQuestion = () => {
    setShowAnswer(false);
    setTimeLeft(10);
    setCurrentIndex((prev) => prev + 1);
  };

  const saveScore = (finalScore) => {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ name: playerName, score: finalScore });

    // Sort by highest score
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    alert(`Quiz Completed! ${playerName}, your final score: ${finalScore}`);
  };

  const accuracy = totalAnswered > 0 ? ((correctCount / totalAnswered) * 100).toFixed(2) : 0;

  return (
    <div className="flex flex-col items-center">
      {quizCompleted ? (
        <div className="text-center" title="Congratulations! You have finished the quiz.">
          <h2 className="text-2xl font-bold text-green-600">🎉 Quiz Completed!</h2>
          <p className="text-lg">
            Your final score: <span className="font-bold">{score}</span>
          </p>
        </div>
      ) : flashcards.length > 0 ? (
        <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center relative">
          <h2 
            className="text-lg font-bold mb-4 text-black" 
            title="Current flashcard question"
          >
            {flashcards[currentIndex].question}
          </h2>

          {showAnswer ? (
            <p className="text-green-600 font-semibold" title="Correct answer">
              {flashcards[currentIndex].answer}
            </p>
          ) : (
            <p className="text-gray-400 italic" title="Click the button to see the answer">
              Tap to reveal the answer
            </p>
          )}

          <button 
            className="btn btn-accent mt-4" 
            onClick={() => setShowAnswer(!showAnswer)}
            title={showAnswer ? "Hide the answer" : "Show the answer"}
          >
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>

          {/* Timer UI */}
          <div className="mt-4" title="Time remaining for this question">
            <p className="text-sm text-gray-600">Time Left: {timeLeft}s</p>
            <progress className="progress progress-primary w-full" value={timeLeft} max="10"></progress>
          </div>

          {/* Answer Buttons */}
          <div className="mt-4 flex gap-4 justify-center">
            <button 
              className="btn btn-success btn-dash" 
              onClick={() => handleAnswer(true)}
              title="Mark answer as correct"
            >
              ✅ Correct
            </button>
            <button 
              className="btn btn-error btn-dash" 
              onClick={() => handleAnswer(false)}
              title="Mark answer as incorrect"
            >
              ❌ Incorrect
            </button>
          </div>

          {/* Score & Progress */}
          <div className="mt-6 p-4 bg-gray-100 rounded-lg w-full text-black" title="Quiz progress summary">
            <h3 className="font-bold text-lg text-secondary">📊 Progress</h3>
            <p title="Your current quiz score">Score: <span className="font-semibold">{score}</span></p>
            <p title="Number of correct answers">Correct: <span className="text-green-600">{correctCount}</span></p>
            <p title="Number of incorrect answers">Incorrect: <span className="text-red-600">{incorrectCount}</span></p>
            <p title="Accuracy percentage">Accuracy: <span className="text-purple-600">{accuracy}%</span></p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500" title="No flashcards available to display">
          No flashcards available!
        </p>
      )}
    </div>
  );
}
