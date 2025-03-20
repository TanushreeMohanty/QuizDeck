import { useState } from "react";

export default function FlashcardForm({ onSave, editingFlashcard, setEditingFlashcard }) {
  const [question, setQuestion] = useState(editingFlashcard?.question || "");
  const [answer, setAnswer] = useState(editingFlashcard?.answer || "");
  const [category, setCategory] = useState(editingFlashcard?.category || "General");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question || !answer) return;
    
    onSave({ id: editingFlashcard?.id || Date.now(), question, answer, category });
    setQuestion("");
    setAnswer("");
    setCategory("General");
    setEditingFlashcard(null);
  };

  return (
    <form onSubmit={handleSubmit} className="card bg-white p-5 shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-center text-pink-500">
        {editingFlashcard ? "Edit Flashcard" : "Add New Flashcard"}
      </h2>
      
      {/* Question Input */}
      <input
        type="text"
        placeholder="Enter question..."
        className="input input-bordered w-full my-2 text-white"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        title="Enter the question for the flashcard"
      />

      {/* Answer Input */}
      <input
        type="text"
        placeholder="Enter answer..."
        className="input input-bordered w-full my-2 text-white"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        title="Enter the answer for the flashcard"
      />
      
      {/* Category Selection */}
      <select
        className="select select-bordered w-full my-2 text-white"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        title="Select a category for the flashcard"
      >
        <option value="General">General</option>
        <option value="Math">Math</option>
        <option value="Science">Science</option>
        <option value="History">History</option>
        <option value="Language">Language</option>
      </select>

      {/* Submit Button */}
      <button 
        type="submit" 
        className="btn btn-success w-full"
        title={editingFlashcard ? "Update the existing flashcard" : "Add a new flashcard"}
      >
        {editingFlashcard ? "Update" : "Add"}
      </button>
    </form>
  );
}
