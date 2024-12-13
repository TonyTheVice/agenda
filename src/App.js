import React, { useState, useEffect } from 'react';
import './App.css';
import Calendar from './components/Calendar/Calendar';
import DayView from './components/DayView/DayView';
import Header from './components/Header/Header';
import AllNotes from './components/AllNotes/AllNotes';
import InformationPage from './components/InformationPage/InformationPage';
import { get, ref, set } from 'firebase/database';
import { SECRET_KEY } from './constants';
import { db } from './firebase';

function App() {

  const [selectedDay, setSelectedDay] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  });
  const [allNotesView, setAllNotesView] = useState(false);
  const [notes, setNotes] = useState([]);
  const [dayNotes, setDayNotes] = useState([]);
  const [calendarView, setCalendarView] = useState('monthly');
  const [informationView, setInformationView] = useState(false);
  const { ipcRenderer } = window.require('electron'); 

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

      const notesRef = ref(db, 'notes/');
      const notesSnapshot = await get(notesRef);
      if (notesSnapshot.exists()) {
        const allNotes = notesSnapshot.val();
        setNotes(allNotes);
      }
      else {
        setNotes([]);
      }
    };

    fetchNotes();
  }, [dayNotes]);


  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentDay = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

      Object.keys(notes).forEach((day) => {
        if (day === currentDay) {
          notes[day].forEach((note, index) => {
            if (note.isAllDay) {
              if (!note.notified) {
                console.log("Trigger notification for all-day event:", note.text);
                ipcRenderer.send('notify', {
                  title: 'Reminder',
                  body: note.text,
                });

                notes[day][index].notified = true;
                const notesRef = ref(db, 'notes/' + day);
                set(notesRef, notes[day]);
              }
            } else if (note.time) {
              const [hour, minute] = note.time.split(':');
              const [year, month, dayOfMonth] = day.split('-');
              const noteTime = new Date();
              noteTime.setFullYear(year, month - 1, dayOfMonth);
              noteTime.setHours(hour, minute, 0);
              if (noteTime <= now && !note.notified) {
                console.log("Trigger notification for time-based note:", note.text);
                ipcRenderer.send('notify', {
                  title: 'Reminder',
                  body: note.text,
                });

                notes[day][index].notified = true;
                const notesRef = ref(db, 'notes/' + day);
                set(notesRef, notes[day]);
              }
            }
          });
        }
      });

      setNotes({ ...notes });

    }, 20000);

    return () => clearInterval(interval);

  }, [notes]);




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
              setSelectedDay(date);
            }} />
            {selectedDay && <DayView notes={dayNotes} setNotes={setDayNotes} selectedDay={selectedDay} allNotesView={allNotesView} />}
          </div>
          :
          <div className="main">
            <Calendar notes={notes} onDayClick={handleDayClick} selectedDay={selectedDay} currentView={calendarView} />
            {selectedDay && <DayView notes={dayNotes} setNotes={setDayNotes} selectedDay={selectedDay} allNotesView={allNotesView} />}
          </div>
      }
    </div>
  );
}

export default App;
