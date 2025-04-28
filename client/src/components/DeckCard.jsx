import React from "react";
import { useNavigate } from "react-router-dom";
import Flashcards from "./Flashcard";
import Button from "./Button";
import Input from "./Input";
import Textarea from "./Textarea";
import ToggleSwitch from "./ToggleSwitch";
import AnimatedCard from "./AnimatedCard";
import { AnimatePresence } from "framer-motion";
import { CircleX, SquarePen, Trash2 } from "lucide-react";
import useIsMobile from "../hooks/useIsMobile";

// DeckCard component displays a deck and conditionally allows editing
const DeckCard = ({
  deck,
  editingDeckId,
  editForm,
  setEditForm,
  setEditingDeckId,
  handleUpdate,
  handleDelete,
  handleEditClick,
}) => {
  const isEditing = editingDeckId === deck.id; // check if this deck is being edited

  const navigate = useNavigate();
  const isMobile = useIsMobile(768);
  return (
    <>
      <div className="deck-wrapper">
        {/* Main deck card display */}
        <div className="deck-card">
          <h3>{deck.title}</h3>
          <p>{deck.description}</p>

          {/* Mobile-only button row for Study and Edit/Delete */}
          <div className="mobile-btn-row">
            {/* <Button variant={`${isMobile ? "secondary-reverse" : "primary"}`}>
              <Link to={`/study/${deck.id}`}>Study</Link>
            </Button> */}

            <Button variant={`${isMobile ? "secondary-reverse" : "primary"}`} 
            onClick={() =>  navigate(`/study/deck/${deck.id}?from=decks`)}
            >
              Study Deck
            </Button>

            <div className="edit-overlay">
              <SquarePen onClick={() => handleEditClick(deck)} />
              <Trash2 onClick={() => handleDelete(deck.id)} />
            </div>
          </div>

          {/* Extra delete icon for non-mobile usage */}
          <CircleX onClick={() => handleDelete(deck.id)} />
          {/* <p><strong>{deck.is_public ? 'Public' : 'Private'}</strong></p> */}
        </div>

        {/* Section below the deck for flashcards or edit form */}
        <div className="flashcards-wrapper">
          {/* Show Edit Form if in edit mode */}
          <AnimatePresence mode="wait">
            {isEditing && (
              <AnimatedCard
                className="deck-edit"
                key="decks"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {/* Deck Title Input */}
                <Input
                  type="text"
                  value={editForm.title}
                  label="Title"
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                  placeholder="Title"
                />

                {/* Deck Description Input */}
                <Textarea
                  value={editForm.description}
                  rows={2}
                  label="Description"
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  placeholder="Description"
                />

                {/* Public/Private Toggle */}
                <ToggleSwitch
                  isPublic={editForm.is_public}
                  onChange={(newVal) =>
                    setEditForm({ ...editForm, is_public: newVal })
                  }
                />

                {/* Save/Cancel Buttons */}
                <div className="btn-row">
                  <Button onClick={handleUpdate}>Save</Button>
                  <Button
                    variant="secondary"
                    onClick={() => setEditingDeckId(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </AnimatedCard>
            )}
          </AnimatePresence>

          {/* Show Flashcards if NOT in edit mode */}
          <AnimatePresence mode="wait">
            {!isEditing && (
              <AnimatedCard
                key="flashcards"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Flashcards deckId={deck.id} />
              </AnimatedCard>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default DeckCard;
