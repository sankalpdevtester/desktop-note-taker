import React, { useState, useEffect } from 'react';
import Note from './Note';
import { getNotes, searchNotes, categorizeNotes } from '../utils/storage';

interface NoteListProps {
  notes: any[];
  onNoteSelect: (note: any) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onNoteSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [filteredNotes, setFilteredNotes] = useState(notes);

  useEffect(() => {
    const storedNotes = getNotes();
    setFilteredNotes(storedNotes);
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const searchedNotes = searchNotes(searchTerm);
    setFilteredNotes(searchedNotes);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setCategory(category);
    const categorizedNotes = categorizeNotes(category);
    setFilteredNotes(categorizedNotes);
  };

  return (
    <div>
      <input
        type="search"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search notes"
      />
      <select value={category} onChange={handleCategoryChange}>
        <option value="">All categories</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
      </select>
      <ul>
        {filteredNotes.map((note) => (
          <li key={note.id}>
            <Note note={note} onNoteSelect={onNoteSelect} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;