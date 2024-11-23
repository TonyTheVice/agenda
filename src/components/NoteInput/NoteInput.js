import React, { useState, useEffect } from "react";
import { TextField, Checkbox, FormControlLabel, Button, Typography } from "@mui/material";
import "./NoteInput.css";

const NoteInput = ({ onSaveNote, editingNote, onCancelEdit }) => {
  const [text, setText] = useState("");
  const [time, setTime] = useState("");
  const [isAllDay, setIsAllDay] = useState(true);

  useEffect(() => {
    if (editingNote) {
      setText(editingNote.text);
      setTime(editingNote.time || "");
      setIsAllDay(editingNote.isAllDay);
    }
  }, [editingNote]);

  const handleSave = () => {
    if (!text.trim()) {
      alert("Note text cannot be empty!");
      return;
    }

    onSaveNote({
      text,
      time: isAllDay ? "All Day" : time,
      isAllDay,
    });

    setText("");
    setTime("");
    setIsAllDay(true);
  };

  const handleCancel = () => {
    // Limpa os campos e chama a função de cancelar
    setText("");
    setTime("");
    setIsAllDay(true);
    onCancelEdit(); // Chama o método de cancelamento de edição
  };

  return (
    <div className="note-input">
      <Typography
        sx={{ color: "white" }}
        variant="subtitle1"
      >
        {editingNote ? "Editar nota existente" : "Criar uma nova nota"}
      </Typography>
      <TextField
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        value={text}
        sx={{border: "2px solid white", borderRadius: "4px", fontStyle: "italic"}}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escreva algo sobre este dia..."
        margin="normal"
      />
      <div className="note-actions">
        <div style={{display: 'flex', alignItems:'center'}}>
          <FormControlLabel
            sx={{ color: "white" }}
            control={
              <Checkbox
                sx={{ color: "white", marginRight: 0 }}
                checked={isAllDay}
                onChange={(e) => setIsAllDay(e.target.checked)}
              />
            }
            label={isAllDay && "Todo o dia"}
          />
          {!isAllDay && (
            <TextField
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                style: {
                  color: "white", // Change the input text color to white
                },
              }}
              sx={{
                '& .MuiInputBase-input': {
                  color: 'white', // Ensures text inside the input is white
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white', // Optional: make the border white
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
              }}
              size="small"
            />
          )}
        </div>
        <div className="action-buttons">
          {editingNote && (
            <Button
              className="note-input-button"
              variant="outlined"
              onClick={handleCancel}
              sx={{ textTransform: "none", marginLeft: 1, backgroundColor: "#5d001e" }}
            >
              Cancelar
            </Button>
          )}
          <Button
            className="note-input-button"
            variant="contained"
            onClick={handleSave}
            sx={{ textTransform: "none", backgroundColor: "#4056A1" }}
          >
            {editingNote ? "Guardar alterações" : "Adicionar nota"}
          </Button>
        </div>


      </div>
    </div>
  );
};

export default NoteInput;
