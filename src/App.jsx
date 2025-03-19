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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  // Dark Mode State (Stored in localStorage)
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Add or Update Flashcard
  const addOrUpdateFlashcard = (newFlashcard) => {
    setFlashcards((prev) =>
      prev.some((fc) => fc.id === newFlashcard.id)
        ? prev.map((fc) => (fc.id === newFlashcard.id ? newFlashcard : fc))
        : [...prev, newFlashcard]
    );
  };

  // Delete Flashcard
  const deleteFlashcard = (id) => {
    setFlashcards(flashcards.filter((flashcard) => flashcard.id !== id));
  };

  // Edit Flashcard
  const editFlashcard = (flashcard) => {
    setEditingFlashcard(flashcard);
  };

  // Extract Unique Categories
  const categories = ["All", ...new Set(flashcards.map((fc) => fc.category))];

  // Filtered Flashcards Based on Search, Category & Difficulty
  const filteredFlashcards = flashcards.filter((fc) => {
    const matchesSearch = fc.question.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || fc.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || fc.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

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

      {/* Filters Section (Only in Study Mode) */}
      {!quizMode && (
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {/* Search Input */}
          <input
            type="text"
            placeholder="🔍 Search flashcards..."
            className="px-4 py-2 border rounded-lg shadow-md transition-all duration-300 bg-white dark:bg-gray-800 text-black dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Category Filter */}
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

          {/* Difficulty Filter */}
          <select
            className="px-4 py-2 border rounded-lg shadow-md transition-all duration-300 
            bg-white dark:bg-gray-800 text-black dark:text-white"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
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
          <FlashcardList flashcards={filteredFlashcards} onEdit={editFlashcard} onDelete={deleteFlashcard} />
        </>
      )}
    </div>
  );
}
