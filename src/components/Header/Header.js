import React from 'react';
import { Button, IconButton } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import './Header.css'; // Add styling for the header

const Header = ({ setSelectedDay, calendarView, setCalendarView, setAllNotesView, allNotesView, informationView, setInformationView }) => {

  const toggleView = () => {
    setCalendarView((prevView) => (prevView === 'monthly' ? 'weekly' : 'monthly'));
    setInformationView(false);
  };

  const toggleAllNotes = () => {
    setAllNotesView(true)
    setInformationView(false);
    setSelectedDay(null);
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
                backgroundColor: '#8540c8',
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
                backgroundColor: '#8540c8',
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
                backgroundColor: '#8540c8',
                textTransform: "none"
              }}
              variant='contained'
              onClick={toggleAllNotes}
            >
              {'Agenda'}
            </Button>
          </>
        }
      </div>
      {!informationView &&
        <IconButton
          sx={{
            textTransform: "none",
            marginLeft: '24px',
            background: "#8540c8"
          }}
          variant='contained'
          onClick={toggleInformationPage}
        >
          <QuestionMarkIcon sx={{ color: "white" }} />
        </IconButton>
      }
      {/* Add more header elements here in the future */}
    </header>
  );
};

export default Header;
