import React, { useState, useEffect } from 'react';
import './App.css';
import Calendar from './components/Calendar/Calendar';
import DayView from './components/DayView/DayView';
import Header from './components/Header/Header';
import AllNotes from './components/AllNotes/AllNotes';
import InformationPage from './components/InformationPage/InformationPage';
import { get, ref, set } from 'firebase/database';
import { SECRET_KEY } from './constants';
import { db } from './firebase'; // Import Firebase Realtime Database functions

function App() {
  const [selectedDay, setSelectedDay] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  });
  const [allNotesView, setAllNotesView] = useState(false);
  const [notes, setNotes] = useState([]); // State to hold the notes
  const [dayNotes, setDayNotes] = useState([]); // State to hold the day notes
  const [calendarView, setCalendarView] = useState('monthly'); // Manage calendar view state
  const [informationView, setInformationView] = useState(false); //
  //const { ipcRenderer } = window.require('electron'); // Import ipcRenderer for communication with the main process

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setAllNotesView(false);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const secretKey = SECRET_KEY;
      const secretRef = ref(db, 'secret');
      const snapshot = await get(secretRef);

      if (snapshot.val() !== secretKey) {
        throw new Error('Acesso negado!');
      }

      const notesRef = ref(db, 'notes/'); // Reference to all notes in the database
      const notesSnapshot = await get(notesRef);
      if (notesSnapshot.exists()) {
        const allNotes = notesSnapshot.val(); // Get all notes from the database

        setNotes(allNotes); // Set the notes state as the raw structure with days as keys
      } else {
        setNotes([]); // No notes in the database
      }
    };

    fetchNotes();
  }, [dayNotes]); // Empty dependency array means this effect will run once when the component mounts


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
                /*ipcRenderer.send('notify', {
                  title: 'Reminder',
                  body: note.text,
                });*/

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
                /*ipcRenderer.send('notify', {
                  title: 'Reminder',
                  body: note.text,
                });*/

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
      <Header setSelectedDay={setSelectedDay} calendarView={calendarView} setCalendarView={setCalendarView} allNotesView={allNotesView} setAllNotesView={setAllNotesView} informationView={informationView} setInformationView={setInformationView} />
      {informationView ?
        <div className="information">
          <InformationPage />
        </div>
        : allNotesView ?
          <div className='allnotes'>
            <AllNotes notes={notes} selectedDay={selectedDay} onEdit={(date) => {
              setSelectedDay(date); // Update the selected day
            }} />
            {selectedDay && <DayView notes={dayNotes} setNotes={setDayNotes} selectedDay={selectedDay} allNotesView={allNotesView} />}
          </div>
          :
          <div className="main">
            <Calendar notes={notes} onDayClick={handleDayClick} selectedDay={selectedDay} currentView={calendarView} />
            {selectedDay && <DayView notes={dayNotes} setNotes={setDayNotes} selectedDay={selectedDay} allNotesView={allNotesView}/>}
          </div>
      }
    </div>
  );
}

export default App;
