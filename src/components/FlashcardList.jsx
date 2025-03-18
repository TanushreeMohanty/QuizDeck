import { useState } from "react";
import Flashcard from "./Flashcard";

export default function FlashcardList({ flashcards, onEdit, onDelete }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFlashcards =
    selectedCategory === "All"
      ? flashcards
      : flashcards.filter((fc) => fc.category === selectedCategory);

  return (
    <div className="mt-5">
      {/* Category Filter Dropdown */}
      <div className="flex justify-center mb-4">
        <select
          className="select select-bordered"
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
            <Flashcard key={flashcard.id} flashcard={flashcard} onEdit={onEdit} onDelete={onDelete} />
          ))
        ) : (
          <p className="text-center text-gray-500 w-full">No flashcards in this category!</p>
        )}
      </div>
    </div>
  );
}
