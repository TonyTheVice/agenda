import React, { useState, useEffect } from "react";
import { set, get, ref } from "firebase/database";
import "./DayView.css";
import { Typography } from "@mui/material";
import NoteInput from "../NoteInput/NoteInput";
import NoteList from "../NoteList/NoteList";
import { SECRET_KEY } from "../../constants";
import { db } from "../../firebase"; // Import Firebase Realtime Database functions

const DayView = ({ selectedDay, notes, setNotes }) => {
  const [editNoteIndex, setEditNoteIndex] = useState(null);

  // Fetch notes from Firebase Realtime Database when the component mounts
  useEffect(() => {
    const fetchNotes = async () => {
      const secretKey = SECRET_KEY;
      const secretRef = ref(db, 'secret');
      const snapshot = await get(secretRef);
    
      if (snapshot.val() !== secretKey) {
        throw new Error('Acesso negado!');
      }

      const notesRef = ref(db, "notes/" + selectedDay); // Reference to the notes for a specific day
      const notesSnapshot  = await get(notesRef);
      if (notesSnapshot .exists()) {
        setNotes(notesSnapshot .val());
      } else {
        setNotes([]);
      }
    };
    fetchNotes();
  }, [selectedDay]);

  // Add or update a note
  const handleSaveNote = async (note) => {
    try {
      const notesRef = ref(db, "notes/" + selectedDay); // Reference to the notes for a specific day

      let updatedNotes = [...notes];
      if (editNoteIndex !== null) {
        // If editing, update the specific note
        updatedNotes[editNoteIndex] = {
          ...note,
          notified: note.notified !== undefined ? note.notified : false,
        };
      } else {
        // Otherwise, add the new note
        updatedNotes.push({
          ...note,
          notified: note.notified !== undefined ? note.notified : false,
        });
      }

      // Save updated notes back to Firebase Realtime Database
      await set(notesRef, updatedNotes);
      setNotes(updatedNotes); // Update local state to trigger re-render
      setEditNoteIndex(null); // Reset edit index
    } catch (error) {
      console.error("Error saving note: ", error);
    }
  };

  // Delete a note
  const handleDeleteNote = async (index) => {
    try {
      const notesRef = ref(db, "notes/" + selectedDay);
      const updatedNotes = notes.filter((_, i) => i !== index);

      // Save updated notes back to Firebase Realtime Database
      await set(notesRef, updatedNotes);
      setNotes(updatedNotes); // Update local state
    } catch (error) {
      console.error("Error deleting note: ", error);
    }
  };

  // Edit a note
  const handleEditNote = (index) => {
    setEditNoteIndex(index); // Set the note to edit
  };

  // Cancel editing a note
  const handleCancelEdit = () => {
    setEditNoteIndex(null); // Reset edit index to cancel editing
  };

  return (
    <div className="day-view">
      <Typography
        className="day-title"
        variant="h2"
      >
        {new Date(selectedDay)
          .toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })
          .replace(/(\sde\s)([a-z])/g, (_, preposition, monthChar) => {
            return `${preposition}${monthChar.toUpperCase()}`;
          })}
      </Typography>
      <NoteInput
        onSaveNote={handleSaveNote}
        onCancelEdit={handleCancelEdit} // Passando a função para o componente
        editingNote={editNoteIndex !== null ? notes[editNoteIndex] : null}
      />
      <NoteList
        notes={notes}
        onDeleteNote={handleDeleteNote}
        onEditNote={handleEditNote}
      />
    </div>
  );
};

export default DayView;
