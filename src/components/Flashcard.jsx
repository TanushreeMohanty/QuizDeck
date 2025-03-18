import { useState } from "react";

export default function Flashcard({ flashcard, onEdit, onDelete }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="card bg-white shadow-lg p-5 rounded-lg cursor-pointer w-60 border-l-4 border-blue-500"
      onClick={() => setFlipped(!flipped)}
    >
      <p className="text-xs text-gray-500 mb-1">{flashcard.category}</p>
      <h3 className="text-lg font-semibold text-center text-black">
        {flipped ? flashcard.answer : flashcard.question}
      </h3>
      <div className="flex justify-between mt-3">
        <button className="btn btn-sm btn-primary" onClick={() => onEdit(flashcard)}>Edit</button>
        <button className="btn btn-sm btn-error" onClick={() => onDelete(flashcard.id)}>Delete</button>
      </div>
    </div>
  );
}
