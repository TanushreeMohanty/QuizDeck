import { useState } from "react";
import FlashcardForm from "./components/FlashcardForm";
import FlashcardList from "./components/FlashcardList";

export default function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [editingFlashcard, setEditingFlashcard] = useState(null);

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

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center text-blue-600">Flashcard Quiz 🚀</h1>
      <FlashcardForm onSave={addOrUpdateFlashcard} editingFlashcard={editingFlashcard} setEditingFlashcard={setEditingFlashcard} />
      <FlashcardList flashcards={flashcards} onEdit={editFlashcard} onDelete={deleteFlashcard} />
    </div>
  );
}
