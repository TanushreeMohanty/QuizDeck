import { useState } from "react";

export default function FlashcardForm({ onSave, editingFlashcard, setEditingFlashcard }) {
  const [question, setQuestion] = useState(editingFlashcard?.question || "");
  const [answer, setAnswer] = useState(editingFlashcard?.answer || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question || !answer) return;
    
    onSave({ id: editingFlashcard?.id || Date.now(), question, answer });
    setQuestion("");
    setAnswer("");
    setEditingFlashcard(null);
  };

  return (
    <form onSubmit={handleSubmit} className="card bg-white p-5 shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-center text-pink-500">
        {editingFlashcard ? "Edit Flashcard" : "Add New Flashcard"}
      </h2>
      <input
        type="text"
        placeholder="Enter question..."
        className="input input-bordered w-full my-2"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter answer..."
        className="input input-bordered w-full my-2"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button type="submit" className="btn btn-primary w-full">
        {editingFlashcard ? "Update" : "Add"}
      </button>
    </form>
  );
}
