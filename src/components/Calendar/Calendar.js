import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import East from '@mui/icons-material/East';
import West from '@mui/icons-material/West';
import "./Calendar.css";

const Calendar = ({ onDayClick, selectedDay, currentView, notes }) => {
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

  // Check if there are notes for a specific day
  const hasNotes = (date) => {
    const dateString = date.toISOString().split("T")[0];
    return notes[dateString] && notes[dateString].length > 0;
  };

  return (
    <div className="calendar-root">
      <div className="calendar-section">
        <Typography variant="h2" className="calendar-year">
          {currentYear}
        </Typography>
        <div className="calendar">
          {currentView === "monthly" ? (
            <>
              <div className="calendar-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <IconButton sx={{ color: 'white', background: "#4056A1" }} onClick={prevMonth}>
                  <West sx={{ fontSize: '30px' }} />
                </IconButton>
                <div className="calendar-date-title" style={{ textAlign: 'center', flex: '1' }}>
                  <h2 className="calendar-date-label" style={{ margin: 0 }}>
                    {new Date(currentYear, currentMonth)
                      .toLocaleString("default", { month: "long" })
                      .replace(/^\w/, (c) => c.toUpperCase())}
                  </h2>
                </div>
                <IconButton sx={{ color: 'white', background: "#4056A1" }} onClick={nextMonth}>
                  <East sx={{ fontSize: '30px' }} />
                </IconButton>
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
                      ? "selected" : hasNotes(new Date(currentYear, currentMonth, day)) ? "has-notes"
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
                <IconButton sx={{ color: 'white', background: "#4056A1" }} onClick={prevWeek}>
                  <West sx={{ fontSize: '30px' }} />
                </IconButton>
                <div className="calendar-date-title" style={{ textAlign: 'center', flex: '1' }}>
                  <h2 className="calendar-date-label" style={{ margin: 0 }}>
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
                </div>
                <IconButton sx={{ color: 'white', background: "#4056A1" }} onClick={nextWeek}>
                  <East sx={{ fontSize: '30px' }} />
                </IconButton>
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
                    className={`calendar-day ${hasNotes(date) ? "has-notes" : selectedDay === `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
                      ? "selected"
                      : ""
                      } ${date.toDateString() === today.toDateString() ? "today" : ""}`}
                    onClick={() => onDayClick(date.toISOString().split("T")[0])}
                  >
                    <div className="calendar-day-number">{date.getDate()}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      {/* Color Legend Caption */}
      <div className="calendar-legend">
        <Typography variant="caption" sx={{ color: "white" }}>
          <span style={{ backgroundColor: "#41c95f", padding: "5px" }}>Data de hoje</span>
          <span style={{ backgroundColor: "#8540c8", padding: "5px", marginLeft: "10px" }}>Data selecionada</span>
          <span style={{ backgroundColor: "#d6014f", padding: "5px", marginLeft: "10px" }}>Dias com notas</span>
        </Typography>
      </div>
    </div>
  );
};

export default Calendar;
