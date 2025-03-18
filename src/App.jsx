import { useState } from "react";
import FlashcardForm from "./components/FlashcardForm";
import FlashcardList from "./components/FlashcardList";
import QuizMode from "./components/QuizMode";

export default function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [editingFlashcard, setEditingFlashcard] = useState(null);
  const [quizMode, setQuizMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const addOrUpdateFlashcard = (newFlashcard) => {
    setFlashcards((prev) =>
      prev.some((fc) => fc.id === newFlashcard.id)
        ? prev.map((fc) => (fc.id === newFlashcard.id ? newFlashcard : fc))
        : [...prev, newFlashcard]
    );
  };
  

  const deleteFlashcard = (id) => {
    setFlashcards(flashcards.filter((flashcard) => flashcard.id !== id));
  };

  const editFlashcard = (flashcard) => {
    setEditingFlashcard(flashcard);
  };

  const categories = ["All", ...new Set(flashcards.map((fc) => fc.category))];

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center text-blue-600">Flashcard Quiz 🚀</h1>

      {/* Toggle Study & Quiz Mode */}
      <div className="flex justify-center mb-4">
        <button className="btn btn-primary" onClick={() => setQuizMode(!quizMode)}>
          {quizMode ? "📚 Study Mode" : "📝 Quiz Mode"}
        </button>
      </div>

      {/* Category Selection */}
      {!quizMode && (
        <div className="flex justify-center mb-4">
          <select
            className="select select-bordered w-52"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category, idx) => (
              <option key={idx} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Conditionally Render Study Mode or Quiz Mode */}
      {quizMode ? (
        <QuizMode flashcards={flashcards} />
      ) : (
        <>
          <FlashcardForm onSave={addOrUpdateFlashcard} editingFlashcard={editingFlashcard} setEditingFlashcard={setEditingFlashcard} />
          <FlashcardList
            flashcards={selectedCategory === "All" ? flashcards : flashcards.filter((fc) => fc.category === selectedCategory)}
            onEdit={editFlashcard}
            onDelete={deleteFlashcard}
          />
        </>
      )}
    </div>
  );
}
