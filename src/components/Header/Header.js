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
    setAllNotesView(true)
    setInformationView(false);
  };

  const toggleInformationPage = () => {
    setInformationView(true);
  };

  const toggleBackToAgenda = () => {
    informationView && setInformationView(false);
    allNotesView && setAllNotesView(false);
  };

  return (
    <header className="app-header">
      <div className='app-header-buttons'>
        {(informationView || allNotesView) ?
          <>
            <Button
              sx={{
                borderRadius: '8px',
                backgroundColor: '#4056A1',
                textTransform: "none"
              }}
              variant='contained'
              onClick={toggleBackToAgenda}
            >
              Voltar para calendário
            </Button>
          </>
          :
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
              {'Ver todas as notas'}
            </Button>
          </>
        }
      </div>
      {!informationView &&
        <IconButton
          sx={{
            textTransform: "none",
            marginLeft: '24px',
          }}
          variant='contained'
          onClick={toggleInformationPage}
        >
          <InfoIcon sx={{ color: "#4056A1" }} />
        </IconButton>
      }
      {/* Add more header elements here in the future */}
    </header>
  );
};

export default Header;
