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
  const [showInstructions, setShowInstructions] = useState(true);const [currentStep, setCurrentStep] = useState(0);

  // Streak tracking
  const [streak, setStreak] = useState(() => JSON.parse(localStorage.getItem("streak")) || 0);
  const [lastActiveDate, setLastActiveDate] = useState(() => localStorage.getItem("lastActiveDate") || "");

  // Dark Mode (Stored in localStorage)
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  // Export Flashcards
const exportFlashcards = () => {
  const dataStr = JSON.stringify(flashcards, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "flashcards.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

// Import Flashcards
const importFlashcards = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const importedFlashcards = JSON.parse(e.target.result);
      setFlashcards(importedFlashcards);
      localStorage.setItem("flashcards", JSON.stringify(importedFlashcards));
    } catch (error) {
      alert("Invalid JSON file");
    }
  };
  reader.readAsText(file);
};

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
    darkMode ? "bg-[#474747] text-[#E0E0E0]" : "bg-[#F8F9FA] text-[#333333]"
  }`}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
>
{showInstructions && (
  <motion.div 
    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-5 z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-center">
      <h2 className="text-2xl font-bold mb-4">Welcome to QuizDeck!</h2>

      {/* Step-by-Step Instructions */}
      {currentStep === 0 && (
        <p className="text-gray-700">📚 This platform helps you create and manage flashcards for studying.</p>
      )}
      {currentStep === 1 && (
        <p className="text-gray-700">📝 You can switch between **Study Mode** and **Quiz Mode** to test your knowledge.</p>
      )}
      {currentStep === 2 && (
        <p className="text-gray-700">🔍 Use the **filters** to sort flashcards by **category** and **difficulty**.</p>
      )}
      {currentStep === 3 && (
        <p className="text-gray-700">🏆 Track your **Daily Streak** and see your progress on the **Leaderboard**.</p>
      )}
      {currentStep === 4 && (
        <p className="text-gray-700">📤 You can **import** and **export** flashcards for easy management.</p>
      )}
      {currentStep === 5 && (
        <p className="text-gray-700">🎯 Now you are ready to start using **QuizDeck**!</p>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        <button
          className={`px-4 py-2 rounded ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : 'bg-gray-400 text-white hover:bg-gray-500'}`}
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(currentStep - 1)}
          title="Go to the previous step"

        >
          Previous
        </button>

        {currentStep < 5 ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setCurrentStep(currentStep + 1)}
            title="Go to the next step"

          >
            Next
          </button>
        ) : (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => setShowInstructions(false)}
            title="Close the instructions"

          >
            Finish
          </button>
        )}
      </div>
    </div>
  </motion.div>
)}

      
  {/* ✅ Header */}
  <div className="flex flex-wrap justify-between items-center mb-5 gap-4">
    <motion.h1
      className={`flex items-center gap-3 text-2xl sm:text-3xl md:text-4xl font-extrabold transition-all duration-300 ${
        darkMode ? "text-[#FFC107]" : "text-[#FFB400]"
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={logo}
        alt="QuizDeck Logo"
        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 animate-float"
      />
      QuizDeck
    </motion.h1>

    <motion.button
      className={`btn btn-outline btn-sm sm:btn-md ${
        darkMode ? "border-white text-white hover:bg-gray-800" : ""
      }`}
      onClick={() => setDarkMode(!darkMode)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </motion.button>
  </div>

  {/* ✅ Main Layout: Grid for Flashcards & Leaderboard */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* ✅ Left Section (Flashcards & Quiz Mode) */}
    <div className="lg:col-span-2">
      {/* 🔥 Streak Counter */}
      <div className={`text-center mb-4 text-sm sm:text-base md:text-lg font-semibold ${
        darkMode ? "text-[#FF7043]" : "text-[#FF5722]"
      }`} title="Your current daily streak">
        🔥 Daily Streak: {streak} days
      </div>

      {/* 📝 Study/Quiz Mode Toggle */}
      <div className="flex justify-center mb-6">
        <motion.button
          className={`btn w-full sm:w-auto ${
            darkMode ? "btn-secondary" : "btn-secondary"
          }`}
          onClick={() => setQuizMode(!quizMode)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Switch between Study and Quiz Mode"
        >
          {quizMode ? "📚 Study Mode" : "📝 Quiz Mode"}
        </motion.button>
      </div>

      {/* 📂 Filters Section (Only in Study Mode) */}
      {!quizMode && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.input
            type="text"
            placeholder="🔍 Search flashcards..."
            className={`input input-bordered w-full ${
              darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border-gray-600"
            }`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            whileFocus={{ scale: 1.05 }}
            title="Search for flashcards"
          />
          <motion.select
            className={`select select-bordered w-full ${
              darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border-gray-600"
            }`}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            whileHover={{ scale: 1.05 }}
            title="Filter by category"
          >
            {categories.map((category, idx) => (
              <option key={idx} value={category}>
                {category}
              </option>
            ))}
          </motion.select>
          <motion.select
            className={`select select-bordered w-full ${
              darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border-gray-600"
            }`}
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            whileHover={{ scale: 1.05 }}
            title="Filter by difficulty level"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </motion.select>
        </motion.div>
      )}

      {/* 🏆 Flashcards/Quiz Mode */}
      {quizMode ? (
        <QuizMode flashcards={flashcards} />
      ) : (
        <>
          {/* 📤 Import/Export Buttons */}
          <div className="flex flex-wrap justify-center gap-4 my-4">
            <label
              className={`btn w-full sm:w-auto cursor-pointer ${
                darkMode ? "btn-secondary" : "btn-secondary"
              }`}
            >
              📥 Import Flashcards
              <input type="file" className="hidden" onChange={importFlashcards} />
            </label>
            <button
              onClick={exportFlashcards}
              className={`btn w-full sm:w-auto ${
                darkMode ? "btn-secondary" : "btn-secondary"
              }`}
            >
              📤 Export Flashcards
            </button>
          </div>

          {/* 📝 Flashcard Form */}
          <FlashcardForm
            onSave={addOrUpdateFlashcard}
            editingFlashcard={editingFlashcard}
            setEditingFlashcard={setEditingFlashcard}
          />

          {/* 📚 Flashcard List */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FlashcardList
              flashcards={filteredFlashcards}
              onEdit={editFlashcard}
              onDelete={deleteFlashcard}
            />
          </motion.div>
        </>
      )}
    </div>

    {/* ✅ Right Section (Leaderboard) */}
    <div
      className={`lg:col-span-1 p-4 rounded-lg shadow ${
        darkMode ? "bg-gray-900 text-white border border-gray-700" : "bg-white text-black "
      }`}
      title="View top performers"
    >
      <Leaderboard />
    </div>
  </div>
</motion.div>


  );
}
