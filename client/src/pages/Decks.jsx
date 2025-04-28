import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDecks,
  createDeck,
  updateDeck,
  deleteDeck,
} from "../features/decks/decksSlice";

import DeckCard from "../components/DeckCard";
import Button from "../components/Button";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import ToggleSwitch from "../components/ToggleSwitch";
import { CirclePlus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const Decks = () => {
  const dispatch = useDispatch();
  const { decks, status, error } = useSelector((state) => state.decks);
  const authUser = useSelector((state) => state.auth.user); // get logged in user

  // State for the new deck creation form
  const [newDeck, setNewDeck] = useState({
    title: "",
    description: "",
    is_public: false,
    user_id: 1,
  });

  // Toggle visibility of new deck creation form
  const [addNewDeck, setAddNewDeck] = useState(false);

  // State to manage deck editing
  const [editingDeckId, setEditingDeckId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    is_public: false,
  });

  // Fetch decks based on logged in user (or all)
  useEffect(() => {
    if (authUser?.id) {
      // If a user is logged in, fetch only their decks
      dispatch(fetchDecks(authUser.id));
    } else if (status === "idle") {
      // If no user, fetch all decks (public browsing maybe)
      dispatch(fetchDecks());
    }
  }, [dispatch, authUser]);

  // Create a new deck
  const handleCreate = () => {
    dispatch(createDeck(newDeck));
    setNewDeck({ title: "", description: "", is_public: false, user_id: 1 });
    setAddNewDeck(false);
  };

  // Initialize edit form with deck values
  const handleEditClick = (deck) => {
    setEditingDeckId(deck.id);
    setEditForm({
      title: deck.title,
      description: deck.description,
      is_public: deck.is_public,
    });
  };

  // Update an existing deck
  const handleUpdate = () => {
    dispatch(updateDeck({ id: editingDeckId, updates: editForm }));
    setEditingDeckId(null);
  };

  // Delete a deck
  const handleDelete = (id) => {
    dispatch(deleteDeck(id));
  };

  // Toggle new deck form
  const handleNewDeck = () => {
    setAddNewDeck((prev) => !prev);
  };

  return (
    <>
      {/* Button to open new deck creation form */}
      <div className="btn-create">
        <Button variant="primary" onClick={handleNewDeck}>
          Add New Deck <CirclePlus />
        </Button>
      </div>

      {/* New deck creation form with animation */}
      <AnimatePresence mode="wait">
        {addNewDeck && (
          <motion.div
            className="deck-goal-create"
            key="decks"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <h2>Create New Deck</h2>
            <Input
              type="text"
              value={newDeck.title}
              onChange={(e) =>
                setNewDeck({ ...newDeck, title: e.target.value })
              }
              label="Title"
            />
            <Textarea
              value={newDeck.description}
              onChange={(e) =>
                setNewDeck({ ...newDeck, description: e.target.value })
              }
              label="Description"
            />
            <ToggleSwitch
              isPublic={newDeck.is_public}
              onChange={(newVal) =>
                setNewDeck({ ...newDeck, is_public: newVal })
              }
            />
            <div className="btn-row mt20">
              <Button onClick={handleCreate}>Create Deck</Button>
              <Button variant="secondary" onClick={handleNewDeck}>
                Cancel
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render loading or deck list */}
      {status === "loading" ? (
        <p>Loading...</p>
      ) : (
        decks.map((deck) => (
          <DeckCard
            key={deck.id}
            deck={deck}
            editingDeckId={editingDeckId}
            editForm={editForm}
            setEditForm={setEditForm}
            setEditingDeckId={setEditingDeckId}
            handleEditClick={handleEditClick}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        ))
      )}
    </>
  );
};

export default Decks;
