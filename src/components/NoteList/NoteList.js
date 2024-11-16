import React from "react";
import "./NoteList.css";

const NoteList = ({ notes, onDeleteNote, onEditNote }) => {
  return (
    <div className="note-list">
      {notes.length > 0 ? (
        notes.map((note, index) => (
          <div key={index} className="note-item">
            <div>
              <strong>{note.time || "All Day"}:</strong> {note.text}
            </div>
            <div className="note-actions">
              <button onClick={() => onEditNote(index)}>Edit</button>
              <button onClick={() => onDeleteNote(index)}>Delete</button>
            </div>
          </div>
        ))
      ) : (
        <p className="no-notes-warning">No notes for this day.</p>
      )}
    </div>
  );
};

export default NoteList;
