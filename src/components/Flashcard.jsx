import { useState } from "react";

export default function Flashcard({ flashcard, onEdit, onDelete }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="w-60 p-2">
      {/* Flashcard Flip Container */}
      <div
        className="relative w-full h-40 perspective-1000 cursor-pointer tooltip"
        onClick={() => setFlipped(!flipped)}
       data-tip="Click to flip the card"
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
            flipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Front Side (Question) */}
          <div className="absolute w-full h-full bg-[#ffb300] text-white flex items-center justify-center p-4 rounded-lg shadow-lg backface-hidden">
            <h3 className="text-lg font-semibold text-center">
              {flashcard.question}
            </h3>
          </div>

          {/* Back Side (Answer) */}
          <div className="absolute w-full h-full bg-green-500 text-white flex items-center justify-center p-4 rounded-lg shadow-lg rotate-y-180 backface-hidden">
            <h3 className="text-lg font-semibold text-center">
              {flashcard.answer}
            </h3>
          </div>
        </div>
      </div>

      {/* Category & Action Buttons */}
      <p className="text-xs text-black mt-2 text-center">{flashcard.category}</p>
      <div className="flex justify-between mt-2">
        {/* Tooltip for Edit Button */}
        <button
          className="btn btn-sm btn-secondary"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(flashcard);
          }}
          title="Edit this flashcard"
        >
          ✏️ Edit
        </button>

        {/* Tooltip for Delete Button */}
        <button
          className="btn btn-sm btn-dash btn-error"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(flashcard.id);
          }}
          title="Delete this flashcard"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
