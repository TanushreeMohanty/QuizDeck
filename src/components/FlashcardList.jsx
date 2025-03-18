import Flashcard from "./Flashcard";

export default function FlashcardList({ flashcards, onEdit, onDelete }) {
  return (
    <div className="flex flex-wrap gap-5 justify-center mt-5">
      {flashcards.length > 0 ? (
        flashcards.map((flashcard) => (
          <Flashcard key={flashcard.id} flashcard={flashcard} onEdit={onEdit} onDelete={onDelete} />
        ))
      ) : (
        <p className="text-center text-gray-500 w-full">No flashcards added yet!</p>
      )}
    </div>
  );
}
