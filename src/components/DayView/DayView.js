import React, { useState, useEffect } from "react";
import { set, get, ref } from "firebase/database";
import "./DayView.css";
import NoteInput from "../NoteInput/NoteInput";
import NoteList from "../NoteList/NoteList";
import { db } from "../../firebase"; // Import Firebase Realtime Database functions

const DayView = ({ selectedDay }) => {
  const [notes, setNotes] = useState([]);
  const [editNoteIndex, setEditNoteIndex] = useState(null);

  // Fetch notes from Firebase Realtime Database when the component mounts
  useEffect(() => {
    const fetchNotes = async () => {
      const notesRef = ref(db, "notes/" + selectedDay); // Reference to the notes for a specific day
      const snapshot = await get(notesRef);
      if (snapshot.exists()) {
        setNotes(snapshot.val());
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
        updatedNotes[editNoteIndex] = note;
      } else {
        // Otherwise, add the new note
        updatedNotes.push(note);
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

  return (
    <div className="day-view">
      <h2>Notes for Day {selectedDay}</h2>
      <NoteInput
        onSaveNote={handleSaveNote}
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
