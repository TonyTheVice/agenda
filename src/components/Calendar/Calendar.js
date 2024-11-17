import React, { useState } from "react";
import { Typography } from "@mui/material";
import "./Calendar.css";

const Calendar = ({ onDayClick, selectedDay, currentView }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedWeekStart, setSelectedWeekStart] = useState(new Date()); // Start of the current week

  const today = new Date();

  // Calculate days in the current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Day names
  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  // Generate days array for the monthly view
  const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);


  // Navigate months
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
      setSelectedWeekStart(new Date(currentYear + 1, 0, 1));
    } else {
      setCurrentMonth(currentMonth + 1);
      setSelectedWeekStart(new Date(currentYear, currentMonth + 1, 1));
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
      setSelectedWeekStart(new Date(currentYear - 1, 11, 1));
    } else {
      setCurrentMonth(currentMonth - 1);
      setSelectedWeekStart(new Date(currentYear, currentMonth - 1, 1));
    }
  };

// Weekly view calculations
const getWeekDays = (startDate) => {
  const weekDays = [];
  const date = new Date(startDate);
  for (let i = 0; i < 7; i++) {
    weekDays.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return weekDays;
};

const nextWeek = () => {
  const nextWeekStart = new Date(selectedWeekStart);
  nextWeekStart.setDate(selectedWeekStart.getDate() + 7);
  setSelectedWeekStart(nextWeekStart);

  // Update the currentMonth and currentYear based on the new selectedWeekStart
  setCurrentMonth(nextWeekStart.getMonth());
  setCurrentYear(nextWeekStart.getFullYear());
};

const prevWeek = () => {
  const prevWeekStart = new Date(selectedWeekStart);
  prevWeekStart.setDate(selectedWeekStart.getDate() - 7);
  setSelectedWeekStart(prevWeekStart);

  // Update the currentMonth and currentYear based on the new selectedWeekStart
  setCurrentMonth(prevWeekStart.getMonth());
  setCurrentYear(prevWeekStart.getFullYear());
};


  const currentWeekDays = getWeekDays(selectedWeekStart);

  return (
    <div className="calendar-root">
      <Typography variant="h2" className="calendar-year" >
        {currentYear}
      </Typography>
      <div className="calendar">
        {currentView === "monthly" ? (
          <>
            <div className="calendar-header">
              <button onClick={prevMonth}>&lt; Prev Month</button>
              <div className="calendar-date-title">
                <h2 className="calendar-date-label">
                  {new Date(currentYear, currentMonth)
                    .toLocaleString("default", { month: "long" })
                    .replace(/^\w/, (c) => c.toUpperCase())}
                </h2>
              </div>
              <button onClick={nextMonth}>Next Month &gt;</button>
            </div>

            <div className="calendar-grid">
              {dayNames.map((dayName) => (
                <div key={dayName} className="calendar-day-header">
                  {dayName}
                </div>
              ))}
              {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                <div key={index} className="calendar-day empty"></div>
              ))}
              {daysArray.map((day) => (
                <div
                  key={day}
                  className={`calendar-day ${(selectedDay === `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`)
                    ? "selected"
                    : ""
                    } ${day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear() ? "today" : ""}`}

                  onClick={() => onDayClick(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`)}
                >
                  {day}
                </div>
              ))}
            </div>
          </>
        ) : (
          // Weekly view
          <>
            <div className="calendar-header">
              <button onClick={prevWeek}>&lt; Prev Week</button>
              <h2>
                Semana de{" "}
                {selectedWeekStart
                  .toLocaleDateString("default", {
                    month: "long",
                    day: "numeric",
                  })
                  .replace(/(\sde\s)([a-z])/g, (_, preposition, monthChar) => {
                    return `${preposition}${monthChar.toUpperCase()}`;
                  })}
              </h2>
              <button onClick={nextWeek}>Next Week &gt;</button>
            </div>

            <div className="calendar-grid weekly-view">
              {dayNames.map((dayName) => (
                <div key={dayName} className="calendar-day-header">
                  {dayName}
                </div>
              ))}
              {currentWeekDays.map((date) => (
                <div
                  key={date.toDateString()}
                  className={`calendar-day ${selectedDay === `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
                    ? "selected"
                    : ""
                    } ${date.toDateString() === today.toDateString() ? "today" : ""}`}

                  onClick={() => onDayClick(date.toISOString().split("T")[0])}             >
                  <div className="calendar-day-number">{date.getDate()}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Calendar;
