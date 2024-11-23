import React from 'react';
import { Button, IconButton } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';
import './Header.css'; // Add styling for the header

const Header = ({ calendarView, setCalendarView, setAllNotesView, allNotesView, informationView, setInformationView }) => {

  const toggleView = () => {
    setCalendarView((prevView) => (prevView === 'monthly' ? 'weekly' : 'monthly'));
    setInformationView(false);
  };

  const toggleAllNotes = () => {
    setAllNotesView((prevAllNotes) => !prevAllNotes)
    setInformationView(false);
  };

  const toggleInformationPage = () => {
    setInformationView(true);
  };

  return (
    <header className="app-header">
      <div className='app-header-buttons'>
        {!informationView ?
          <>
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
            <Button
              sx={{
                borderRadius: '8px',
                backgroundColor: '#4056A1',
                textTransform: "none"
              }}
              variant='contained'
              onClick={toggleAllNotes}
            >
              {allNotesView ? 'Ver dia específico' : 'Ver todas as notas'}
            </Button>
          </>
          :
          <Button
            sx={{
              borderRadius: '8px',
              backgroundColor: '#4056A1',
              textTransform: "none"
            }}
            variant='contained'
            onClick={() => setInformationView(false)}
          >
            Voltar para Agenda
          </Button>
        }
      </div>
      <IconButton
        sx={{
          textTransform: "none"
        }}
        variant='contained'
        onClick={toggleInformationPage}
      >
        <InfoIcon sx={{ color: "#4056A1" }} />
      </IconButton>
      {/* Add more header elements here in the future */}
    </header>
  );
};

export default Header;
