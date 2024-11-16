import React, { useState, useEffect } from "react";
import "./NoteInput.css";

const NoteInput = ({ onSaveNote, editingNote }) => {
  const [text, setText] = useState("");
  const [time, setTime] = useState("");
  const [isAllDay, setIsAllDay] = useState(true);

  useEffect(() => {
    if (editingNote) {
      setText(editingNote.text);
      setTime(editingNote.time || "");
      setIsAllDay(editingNote.isAllDay);
    }
  }, [editingNote]);

  const handleSave = () => {
    if (!text.trim()) {
      alert("Note text cannot be empty!");
      return;
    }

    onSaveNote({
      text,
      time: isAllDay ? "All Day" : time,
      isAllDay,
    });

    setText("");
    setTime("");
    setIsAllDay(true);
  };

  return (
    <div className="note-input">
      <textarea
        placeholder="Enter your note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div className="note-time">
        <label className="label-allday">
          <input
            type="checkbox"
            checked={isAllDay}
            onChange={(e) => setIsAllDay(e.target.checked)}
          />
          All Day
        </label>
        {!isAllDay && (
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        )}
      </div>
      <button onClick={handleSave}>
        {editingNote ? "Update Note" : "Add Note"}
      </button>
    </div>
  );
};

export default NoteInput;
