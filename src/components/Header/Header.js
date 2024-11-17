import React from 'react';
import './Header.css'; // Add styling for the header

const Header = ({ calendarView, setCalendarView }) => {
    
  const toggleView = () => {
    setCalendarView((prevView) => (prevView === 'monthly' ? 'weekly' : 'monthly'));
  };

  return (
    <header className="app-header">
      <button onClick={toggleView}>
        Switch to {calendarView === 'monthly' ? 'Weekly View' : 'Monthly View'}
      </button>
      {/* Add more header elements here in the future */}
    </header>
  );
};

export default Header;
