import React from 'react';
import { Button } from '@mui/material'
import './Header.css'; // Add styling for the header

const Header = ({ calendarView, setCalendarView }) => {

  const toggleView = () => {
    setCalendarView((prevView) => (prevView === 'monthly' ? 'weekly' : 'monthly'));
  };

  return (
    <header className="app-header">
      <Button
        sx={{
          borderRadius: '8px',
          backgroundColor: '#4056A1',
          textTransform: "none"
        }}
        variant='contained'
        onClick={toggleView}
      >
        Alterar para {calendarView === 'monthly' ? 'visão semanal' : 'visão mensal'}
      </Button>
      {/* Add more header elements here in the future */}
    </header>
  );
};

export default Header;
