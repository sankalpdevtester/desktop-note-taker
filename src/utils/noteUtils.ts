import { getNotes, saveNote, deleteNote } from './storage';

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
}

const createNote = (title: string, content: string, category: string): Note => {
  const note: Note = {
    id: Date.now().toString(),
    title,
    content,
    category,
  };
  saveNote(note);
  return note;
};

const updateNote = (note: Note): void => {
  saveNote(note);
};

const removeNote = (noteId: string): void => {
  deleteNote(noteId);
};

const getNoteById = (noteId: string): Note | undefined => {
  const notes = getNotes();
  return notes.find((note) => note.id === noteId);
};

export { createNote, updateNote, removeNote, getNoteById };