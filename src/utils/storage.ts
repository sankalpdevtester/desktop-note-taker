// src/utils/storage.ts
import { Note } from '../Note';

interface Storage {
  getNotes(): Note[];
  saveNotes(notes: Note[]): void;
  deleteNote(id: string): void;
}

class LocalStorage implements Storage {
  private storageKey = 'notes';

  getNotes(): Note[] {
    const storedNotes = localStorage.getItem(this.storageKey);
    if (storedNotes) {
      return JSON.parse(storedNotes) as Note[];
    }
    return [];
  }

  saveNotes(notes: Note[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(notes));
  }

  deleteNote(id: string): void {
    const notes = this.getNotes();
    const updatedNotes = notes.filter((note) => note.id !== id);
    this.saveNotes(updatedNotes);
  }
}

const storage = new LocalStorage();

export function getNotesFromStorage(): Note[] {
  return storage.getNotes();
}

export function saveNotesToStorage(notes: Note[]): void {
  storage.saveNotes(notes);
}

export function deleteNoteFromStorage(id: string): void {
  storage.deleteNote(id);
}

// Example usage:
// const notes = getNotesFromStorage();
// saveNotesToStorage(notes);
// deleteNoteFromStorage('note-id');
```

// Update src/App.tsx to use the new storage utility
```typescript
// src/App.tsx
import React, { useState, useEffect } from 'react';
import Note from './Note';
import NoteForm from './NoteForm';
import { getNotesFromStorage, saveNotesToStorage, deleteNoteFromStorage } from './utils/storage';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const storedNotes = getNotesFromStorage();
    setNotes(storedNotes);
  }, []);

  const handleAddNote = (newNote: Note) => {
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    saveNotesToStorage(updatedNotes);
  };

  const handleDeleteNote = (id: string) => {
    deleteNoteFromStorage(id);
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <div>
      <NoteForm onAddNote={handleAddNote} />
      {notes.map((note) => (
        <Note key={note.id} note={note} onDeleteNote={handleDeleteNote} />
      ))}
    </div>
  );
}

export default App;