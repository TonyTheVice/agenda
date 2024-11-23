import React, { useState, useMemo } from "react";
import "./AllNotes.css";
import { Typography, TextField, Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";

const AllNotes = ({ notes }) => {
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("newest"); // 'newest' or 'oldest'
  const [showPastNotes, setShowPastNotes] = useState(false);

  // Transformar o objeto em uma lista para facilitar o processamento
  const notesArray = useMemo(() => {
    return Object.entries(notes).flatMap(([date, notesList]) =>
      notesList.map(note => ({ date, ...note }))
    );
  }, [notes]);

  // Filtrar as notas com base no searchText e no filtro de datas
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
    <div className="all-notes">
      <Typography variant="h5" gutterBottom>
        Todas as Notas
      </Typography>

      {/* Barra de Pesquisa */}
      <TextField
        label="Pesquisar notas"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* Sort */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="sort-label">Ordenar por</InputLabel>
        <Select
          labelId="sort-label"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <MenuItem value="newest">Mais novas primeiro</MenuItem>
          <MenuItem value="oldest">Mais antigas primeiro</MenuItem>
        </Select>
      </FormControl>

      {/* Filtro */}
      <Button
        variant={showPastNotes ? "contained" : "outlined"}
        color="primary"
        onClick={() => setShowPastNotes((prev) => !prev)}
      >
        {showPastNotes ? "Mostrar Apenas Futuros" : "Mostrar Tudo"}
      </Button>

      {/* Notas Filtradas */}
      <div className="notes-container">
        {filteredNotes.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
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
            <div key={date} className="notes-day">
              <Typography variant="h6" gutterBottom>
                {date}
              </Typography>
              <div className="notes-list">
                {notes.map((note, index) => (
                  <div key={index} className="note-item">
                    <Typography variant="body1">{note.text}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {note.isAllDay ? "Dia inteiro" : note.time}
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
