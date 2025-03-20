import { useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import Flashcard from "./Flashcard";

export default function FlashcardList({ flashcards, onEdit, onDelete }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFlashcards =
    selectedCategory === "All"
      ? flashcards
      : flashcards.filter((fc) => fc.category === selectedCategory);

  return (
    <motion.div
      className="mt-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Category Filter Dropdown */}
      <div className="flex justify-center mb-4">
        <select
          className="px-4 py-2 border rounded-lg shadow-md transition-all duration-300 
          bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="General">General</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
          <option value="Language">Language</option>
        </select>
      </div>

      {/* Flashcards Display */}
      <div className="flex flex-wrap gap-5 justify-center">
        {filteredFlashcards.length > 0 ? (
          filteredFlashcards.map((flashcard) => (
            <motion.div
              key={flashcard.id}
              whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)" }}
              transition={{ duration: 0.3 }}
            >
              <Flashcard flashcard={flashcard} onEdit={onEdit} onDelete={onDelete} />
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 w-full">No flashcards in this category!</p>
        )}
      </div>
    </motion.div>
  );
}
