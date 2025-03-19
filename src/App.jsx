import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // For animations
import FlashcardForm from "./components/FlashcardForm";
import FlashcardList from "./components/FlashcardList";
import QuizMode from "./components/QuizMode";
import Leaderboard from "./components/Leaderboard"; // Import Leaderboard
import logo from "./assets/logo.png";

export default function App() {
  const [flashcards, setFlashcards] = useState(() => JSON.parse(localStorage.getItem("flashcards")) || []);
  const [editingFlashcard, setEditingFlashcard] = useState(null);
  const [quizMode, setQuizMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  // Streak tracking
  const [streak, setStreak] = useState(() => JSON.parse(localStorage.getItem("streak")) || 0);
  const [lastActiveDate, setLastActiveDate] = useState(() => localStorage.getItem("lastActiveDate") || "");

  // Dark Mode (Stored in localStorage)
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  // Save flashcards to localStorage when updated
  useEffect(() => {
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
  }, [flashcards]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Daily Streak Logic
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    if (lastActiveDate && lastActiveDate !== today) {
      setStreak((prev) => (new Date(lastActiveDate).getTime() === new Date(today).getTime() - 86400000 ? prev + 1 : 1));
    }
    setLastActiveDate(today);
    localStorage.setItem("streak", JSON.stringify(streak));
    localStorage.setItem("lastActiveDate", today);
  }, []);

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

  // Filter Flashcards
  const filteredFlashcards = flashcards.filter((fc) => {
    return (
      fc.question.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "All" || fc.category === selectedCategory) &&
      (selectedDifficulty === "All" || fc.difficulty === selectedDifficulty)
    );
  });

  return (
    <motion.div
      className={`min-h-screen p-5 transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <motion.h1
          className="flex items-center gap-3 text-4xl font-extrabold text-blue-700 dark:text-blue-400 transition-all duration-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={logo} alt="QuizDeck Logo" className="w-12 h-12 animate-float" />
          QuizDeck
        </motion.h1>

        {/* Dark Mode Toggle */}
        <motion.button
          className="px-4 py-2 border rounded-lg transition-all duration-300 
          hover:bg-gray-200 dark:hover:bg-gray-800"
          onClick={() => setDarkMode(!darkMode)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </motion.button>
      </div>

      {/* Streak Counter */}
      <div className="text-center mb-4 text-lg font-semibold">🔥 Daily Streak: {streak} days</div>

      {/* Toggle Study & Quiz Mode */}
      <div className="flex justify-center mb-6">
        <motion.button
          className="px-5 py-2 font-semibold rounded-lg shadow-md transition-all duration-300
          bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => setQuizMode(!quizMode)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {quizMode ? "📚 Study Mode" : "📝 Quiz Mode"}
        </motion.button>
      </div>

      {/* Filters Section (Only in Study Mode) */}
      {!quizMode && (
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Search Input */}
          <motion.input
            type="text"
            placeholder="🔍 Search flashcards..."
            className="px-4 py-2 border rounded-lg shadow-md transition-all duration-300 bg-white dark:bg-gray-800 text-black dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            whileFocus={{ scale: 1.05 }}
          />

          {/* Category Filter */}
          <motion.select
            className="px-4 py-2 border rounded-lg shadow-md transition-all duration-300 
            bg-white dark:bg-gray-800 text-black dark:text-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            whileHover={{ scale: 1.05 }}
          >
            {categories.map((category, idx) => (
              <option key={idx} value={category}>
                {category}
              </option>
            ))}
          </motion.select>

          {/* Difficulty Filter */}
          <motion.select
            className="px-4 py-2 border rounded-lg shadow-md transition-all duration-300 
            bg-white dark:bg-gray-800 text-black dark:text-white"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            whileHover={{ scale: 1.05 }}
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </motion.select>
        </motion.div>
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
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <FlashcardList flashcards={filteredFlashcards} onEdit={editFlashcard} onDelete={deleteFlashcard} />
          </motion.div>
        </>
      )}

      {/* Leaderboard */}
      <Leaderboard />
    </motion.div>
  );
}
