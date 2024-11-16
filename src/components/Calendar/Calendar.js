import React, { useState } from "react";
import "./Calendar.css";

const Calendar = ({ onDayClick, selectedDay }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentView, setCurrentView] = useState("monthly"); // "monthly" or "weekly"
  const [selectedWeekStart, setSelectedWeekStart] = useState(new Date()); // Start of the current week

  const today = new Date();

  // Calculate days in the current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Day names
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Generate days array for the monthly view
  const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  // Switch between views
  const toggleView = (view) => setCurrentView(view);

  // Navigate months
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
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
  };

  const prevWeek = () => {
    const prevWeekStart = new Date(selectedWeekStart);
    prevWeekStart.setDate(selectedWeekStart.getDate() - 7);
    setSelectedWeekStart(prevWeekStart);
  };

  const currentWeekDays = getWeekDays(selectedWeekStart);

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => toggleView("monthly")}>Monthly View</button>
        <button onClick={() => toggleView("weekly")}>Weekly View</button>
      </div>

      {currentView === "monthly" ? (
        <>
          <div className="calendar-header">
            <button onClick={prevMonth}>&lt; Prev Month</button>
            <h2>
              {new Date(currentYear, currentMonth).toLocaleString("default", {
                month: "long",
              })}{" "}
              {currentYear}
            </h2>
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
                className={`calendar-day ${
                  (selectedDay === `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`)
                    ? "selected"
                    : ""
                } ${day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear() ? "today" : ""}`}
                
                onClick={() => onDayClick(`${currentYear}-${currentMonth + 1}-${day}`)}
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
              Week of{" "}
              {selectedWeekStart.toLocaleDateString("default", {
                month: "long",
                day: "numeric",
              })}
            </h2>
            <button onClick={nextWeek}>Next Week &gt;</button>
          </div>

          <div className="calendar-grid weekly-view">
            {currentWeekDays.map((date) => (
              <div
                key={date.toDateString()}
                className={`calendar-day ${
                  selectedDay === `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
                    ? "selected"
                    : ""
                } ${date.toDateString() === today.toDateString() ? "today" : ""}`}
                
                onClick={() => onDayClick(date.toISOString().split("T")[0])}
              >
                <div className="calendar-day-header">
                  {date.toLocaleString("default", { weekday: "short" })}
                </div>
                <div className="calendar-day-number">{date.getDate()}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Calendar;
