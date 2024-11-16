import React, { useState, useEffect } from 'react';
import './App.css';
import Calendar from './components/Calendar/Calendar';
import DayView from './components/DayView/DayView';
import { get, ref, set } from 'firebase/database';
import { db } from './firebase'; // Import Firebase Realtime Database functions

function App() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [notes, setNotes] = useState([]); // State to hold the notes
  const { ipcRenderer } = window.require('electron'); // Import ipcRenderer for communication with the main process

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const notesRef = ref(db, 'notes/'); // Reference to all notes in the database
      const snapshot = await get(notesRef);
      if (snapshot.exists()) {
        const allNotes = snapshot.val(); // Get all notes from the database
  
        setNotes(allNotes); // Set the notes state as the raw structure with days as keys
      } else {
        setNotes([]); // No notes in the database
      }
    };
  
    fetchNotes();
  }, []); // Empty dependency array means this effect will run once when the component mounts
  

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentDay = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

      // Loop through each day's notes
      Object.keys(notes).forEach((day) => {
        // Only check notes for the current day
        if (day === currentDay) {
          notes[day].forEach((note, index) => {
            // Check if the note is an all-day event or has a specific time
            if (note.isAllDay) {
              // For all-day events, trigger a notification if it's the current day
              if (!note.notified) {
                console.log("Trigger notification for all-day event:", note.text);
                ipcRenderer.send('notify', {
                  title: 'Reminder',
                  body: note.text,
                });

                // Mark the note as notified
                notes[day][index].notified = true; // Mark as notified within the current note array

                // Update Firebase with the changed notes
                const notesRef = ref(db, 'notes/' + day);
                set(notesRef, notes[day]); // Save the updated notes for this day to Firebase
              }
            } else if (note.time) {
              const [hour, minute] = note.time.split(':');

              // Extract year, month, and day from the 'day' variable (currentDay)
              const [year, month, dayOfMonth] = day.split('-'); // Example: "2024-11-16"

              // Create a new Date object for the note's scheduled time
              const noteTime = new Date();
              noteTime.setFullYear(year, month - 1, dayOfMonth); // Set to the correct year, month, day
              noteTime.setHours(hour, minute, 0); // Set the correct hour and minute for the note

              // Check if the current time (`now`) is greater than or equal to the `noteTime`
              // and if the notification has not already been triggered
              if (noteTime <= now && !note.notified) {
                console.log("Trigger notification for time-based note:", note.text);
                ipcRenderer.send('notify', {
                  title: 'Reminder',
                  body: note.text,
                });

                // Mark the note as notified
                notes[day][index].notified = true; // Mark as notified within the current note array

                // Update Firebase with the changed notes
                const notesRef = ref(db, 'notes/' + day);
                set(notesRef, notes[day]); // Save the updated notes for this day to Firebase
              }
            }
          });
        }
      });

      // Update the notes state if any notifications were triggered
      setNotes({ ...notes });

    }, 10000); // Check every 10 seconds (adjust timing as needed)

    // Cleanup on unmount
    return () => clearInterval(interval);

  }, [notes]); // Re-run the effect when `notes` state changes
  
  
  

  return (
    <div className="App">
      <div className="main">
        <Calendar onDayClick={handleDayClick} selectedDay={selectedDay} />
        {selectedDay && <DayView selectedDay={selectedDay} />}
      </div>
    </div>
  );
}

export default App;
