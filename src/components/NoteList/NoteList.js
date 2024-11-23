import React from "react";
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./NoteList.css";

const NoteList = ({ notes, onDeleteNote, onEditNote, selectedDay }) => {
  return (
    <div className="note-list">
      <Typography
        variant="subtitle1"
      >
        Registo
      </Typography>
      {notes.length > 0 ? (
        <div className="scroll-container" style={{ maxHeight: "50%", overflowY: "auto", marginTop: '12px' }}>  {/* Added scroll container */}
          <List sx={{ paddingRight: '24px' }}>
            {notes.map((note, index) => (
              <ListItem key={index} divider sx={{ width: '100%' }}>
                {/* Nota principal com horário ou "Todo o dia" */}
                <div style={{ width: '70%' }} >
                  <ListItemText
                    primary={
                      <Typography variant="body1">
                        <strong>{note.time === "All Day" ? "Sem horário" : note.time}:</strong> {note.text}
                      </Typography>
                    }
                  />
                </div>
                {/* Ações: Editar e Excluir */}
                <ListItemSecondaryAction>
                <div style={{ width: '30%' }} >
                  <Box display="flex" gap={1}>
                    <IconButton onClick={() => onEditNote(index)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onDeleteNote(index)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  </div>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>
      ) : (
        <Typography variant="body2" color="textSecondary" className="no-notes-warning">
          Não há notas para este dia.
        </Typography>
      )}
    </div>
  );
};

export default NoteList;
