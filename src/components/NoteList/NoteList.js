import React from "react";
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./NoteList.css";

const NoteList = ({ notes, onDeleteNote, onEditNote, editNoteIndex  }) => {

  return (
    <div className="note-list">
      <Typography
        sx={{ color: "white" }}
        variant="subtitle1"
      >
        Notas:
      </Typography>
      {notes.length > 0 ? (
        <div className="scroll-container" style={{ maxHeight: "90%", overflowY: "auto" }}>  {/* Added scroll container */}
          <List sx={{ paddingRight: '24px', display:'flex', flexDirection: 'column', gap: '12px' }}>
            {notes.map((note, index) => (
              <ListItem key={index} divider 
              sx={{
                 width: '100%', 
                 background: editNoteIndex === index ? "#bb86fc" : "#4056A1", 
                 borderRadius: "24px" }}>
                {/* Nota principal com horário ou "Todo o dia" */}
                <div style={{ width: '70%' }} >
                  <ListItemText
                    primary={
                      <Typography sx={{color: "white", fontStyle: "italic"}} variant="subtitle2">
                        <strong>{note.time === "All Day" ? "" : note.time+':'}</strong> {note.text}
                      </Typography>
                    }
                  />
                </div>
                {/* Ações: Editar e Excluir */}
                <ListItemSecondaryAction>
                <div style={{ width: '30%' }} >
                  <Box display="flex" gap={1}>
                    <IconButton sx={{background:"white"}} onClick={() => onEditNote(index)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton sx={{background:"white"}} onClick={() => onDeleteNote(index)} color="error">
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
        <Typography variant="body2" className="no-notes-warning">
          Não há notas para este dia.
        </Typography>
      )}
    </div>
  );
};

export default NoteList;
