import React, { useState } from 'react';
import './App.css';
import Calendar from './components/Calendar/Calendar';
import DayView from './components/DayView/DayView';

function App() {
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

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
