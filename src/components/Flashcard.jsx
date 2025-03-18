import { useState } from "react";

export default function Flashcard({ flashcard, onEdit, onDelete }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="w-60">
      {/* Flashcard Flip Container */}
      <div
        className="relative w-full h-40 perspective-1000 cursor-pointer"
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${flipped ? "rotate-y-180" : ""}`}
        >
          {/* Front Side (Question) */}
          <div className="absolute w-full h-full bg-blue-500 text-white flex items-center justify-center p-4 rounded-lg shadow-lg backface-hidden">
            <h3 className="text-lg font-semibold text-center">{flashcard.question}</h3>
          </div>

          {/* Back Side (Answer) */}
          <div className="absolute w-full h-full bg-green-500 text-white flex items-center justify-center p-4 rounded-lg shadow-lg rotate-y-180 backface-hidden">
            <h3 className="text-lg font-semibold text-center">{flashcard.answer}</h3>
          </div>
        </div>
      </div>

      {/* Category & Action Buttons (Fixed Layout) */}
      <p className="text-xs text-gray-500 mt-2 text-center">{flashcard.category}</p>
      <div className="flex justify-between mt-2">
        <button
          className="btn btn-sm btn-primary"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(flashcard);
          }}
        >
          Edit
        </button>
        <button
          className="btn btn-sm btn-error"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(flashcard.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
