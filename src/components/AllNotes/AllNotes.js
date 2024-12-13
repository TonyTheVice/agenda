import React, { useState, useMemo } from "react";
import "./AllNotes.css";
import { Typography, TextField, Select, MenuItem, FormControl, Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function AllNotes({ notes, selectedDay, onEdit })  {
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [showPastNotes, setShowPastNotes] = useState(true);

  const notesArray = useMemo(() => {
    return Object.entries(notes).flatMap(([date, notesList]) =>
      notesList.map(note => ({ date, ...note }))
    );
  }, [notes]);

  const filteredNotes = useMemo(() => {
    const today = new Date();
    return notesArray
      .filter(note => {
        const noteDate = new Date(note.date);
        const matchesSearch = note.text.toLowerCase().includes(searchText.toLowerCase());
        const isFutureOrToday = noteDate >= today;
        return matchesSearch && (showPastNotes || isFutureOrToday);
      })
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
      });
  }, [notesArray, searchText, showPastNotes, sortOrder]);

  return (
    <div className={selectedDay ? "all-notes-full" : "all-notes"}>
      <div class="title-container">
        <Typography className="title" variant="body1" gutterBottom>
          Agenda
        </Typography>
      </div>

      <div>
        <TextField
          InputLabelProps={{ shrink: false }}
          label={searchText ? "" : "Pesquisar notas"}
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{
            input: { background: "ghostwhite", borderRadius: "8px" },
          }}
        />

        <FormControl fullWidth margin="normal" sx={{ color: "white" }}>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            displayEmpty
            sx={{ backgroundColor: "ghostwhite", borderRadius: "8px", color: sortOrder === "" && "#666666" }}
          >
            <MenuItem value="" disabled>
              Ordenar por
            </MenuItem>
            <MenuItem value="newest">Mais recentes</MenuItem>
            <MenuItem value="oldest">Mais antigas</MenuItem>
          </Select>
        </FormControl>
        <Button
          sx={{
            borderRadius: '8px',
            backgroundColor: '#8540c8',
            textTransform: "none",
            margin: "16px 0",
          }}
          variant='contained'
          onClick={() => setShowPastNotes((prev) => !prev)}
        >
          {showPastNotes ? "Mostrar apenas notas futuras" : "Mostrar todas as notas"}
        </Button>
      </div>

      <div className="notes-container">
        {filteredNotes.length === 0 ? (
          <Typography className="no-notes-warning">
            Nenhuma nota encontrada.
          </Typography>
        ) : (
          filteredNotes.reduce((acc, note) => {
            const lastGroup = acc[acc.length - 1];
            if (!lastGroup || lastGroup.date !== note.date) {
              acc.push({ date: note.date, notes: [note] });
            } else {
              lastGroup.notes.push(note);
            }
            return acc;
          }, []).map(({ date, notes }) => (
            <div key={date} className="note-group">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography className="date-header">
                  {new Date(date)
                    .toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" })
                    .replace(/(\sde\s)([a-z])/g, (_, preposition, monthChar) => {
                      return `${preposition}${monthChar.toUpperCase()}`;
                    })}
                </Typography>
                <IconButton onClick={() => onEdit(date)} color="primary" sx={{ background: "white" }}>
                  <EditIcon />
                </IconButton>
              </div>
              <div>
                {notes.map((note, index) => (
                  <div className="note-item" key={index}>
                    <Typography className="note-text" variant="subtitle2">
                      <strong style={{ color: "greenyellow" }}>{note.time === "All Day" ? "" : note.time + ":"}</strong> {note.text}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllNotes;
