import { useState, useEffect } from "react";
import FlashcardForm from "./components/FlashcardForm";
import FlashcardList from "./components/FlashcardList";
import QuizMode from "./components/QuizMode";
import logo from "./assets/logo.png";
export default function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [editingFlashcard, setEditingFlashcard] = useState(null);
  const [quizMode, setQuizMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const addOrUpdateFlashcard = (newFlashcard) => {
    setFlashcards((prev) =>
      prev.some((fc) => fc.id === newFlashcard.id)
        ? prev.map((fc) => (fc.id === newFlashcard.id ? newFlashcard : fc))
        : [...prev, newFlashcard]
    );
  };

  const deleteFlashcard = (id) => {
    setFlashcards(flashcards.filter((flashcard) => flashcard.id !== id));
  };

  const editFlashcard = (flashcard) => {
    setEditingFlashcard(flashcard);
  };

  const categories = ["All", ...new Set(flashcards.map((fc) => fc.category))];

  return (
    <div
      className={`min-h-screen p-5 transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Header Section */}
      <div className="flex justify-between items-center mb-5">
      <h1 className="flex items-center gap-3 text-4xl font-extrabold text-blue-700 dark:text-blue-400 transition-all duration-300">
        <img src={logo} alt="QuizDeck Logo" className="w-12 h-12 animate-float" />
        QuizDeck
      </h1>


        {/* Dark Mode Toggle */}
        <button
          className="px-4 py-2 border rounded-lg transition-all duration-300 
          hover:bg-gray-200 dark:hover:bg-gray-800"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Toggle Study & Quiz Mode */}
      <div className="flex justify-center mb-6">
        <button
          className="px-5 py-2 font-semibold rounded-lg shadow-md transition-all duration-300
          bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => setQuizMode(!quizMode)}
        >
          {quizMode ? "📚 Study Mode" : "📝 Quiz Mode"}
        </button>
      </div>

      {/* Category Selection (Only in Study Mode) */}
      {!quizMode && (
        <div className="flex justify-center mb-6">
          <select
            className="px-4 py-2 border rounded-lg shadow-md transition-all duration-300 
            bg-white dark:bg-gray-800 text-black dark:text-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category, idx) => (
              <option key={idx} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Conditional Rendering: Study Mode or Quiz Mode */}
      {quizMode ? (
        <QuizMode flashcards={flashcards} />
      ) : (
        <>
          <FlashcardForm
            onSave={addOrUpdateFlashcard}
            editingFlashcard={editingFlashcard}
            setEditingFlashcard={setEditingFlashcard}
          />
          <FlashcardList
            flashcards={
              selectedCategory === "All"
                ? flashcards
                : flashcards.filter((fc) => fc.category === selectedCategory)
            }
            onEdit={editFlashcard}
            onDelete={deleteFlashcard}
          />
        </>
      )}
    </div>
  );
}
