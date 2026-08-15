import React, { useState, useEffect } from 'react';
import Note from './Note';
import NoteForm from './NoteForm';

interface Note {
  id: number;
  title: string;
  content: string;
}

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  const handleAddNote = (newNote: Note) => {
    setNotes([...notes, newNote]);
    localStorage.setItem('notes', JSON.stringify([...notes, newNote]));
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
    localStorage.setItem('notes', JSON.stringify(notes.filter((note) => note.id !== id)));
  };

  const handleEditNote = (id: number, updatedNote: Note) => {
    setNotes(notes.map((note) => (note.id === id ? updatedNote : note)));
    localStorage.setItem('notes', JSON.stringify(notes.map((note) => (note.id === id ? updatedNote : note))));
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category: string) => {
    setCategory(category);
  };

  return (
    <div>
      <h1>Simple Desktop Note Taker</h1>
      <NoteForm onAddNote={handleAddNote} />
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search notes"
      />
      <select value={category} onChange={(e) => handleCategoryChange(e.target.value)}>
        <option value="">All categories</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
      </select>
      <ul>
        {notes
          .filter((note) => note.title.toLowerCase().includes(searchTerm.toLowerCase()) && (category === '' || note.category === category))
          .map((note) => (
            <Note key={note.id} note={note} onDelete={handleDeleteNote} onEdit={handleEditNote} />
          ))}
      </ul>
    </div>
  );
};

export default App;