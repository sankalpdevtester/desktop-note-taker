import React, { useState } from 'react';
import { createNote, updateNote, removeNote } from '../utils/noteUtils';

interface NoteEditorProps {
  note: any;
  onNoteSave: () => void;
  onNoteDelete: () => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ note, onNoteSave, onNoteDelete }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [category, setCategory] = useState(note.category);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const handleSave = () => {
    const updatedNote = { ...note, title, content, category };
    updateNote(updatedNote);
    onNoteSave();
  };

  const handleDelete = () => {
    removeNote(note.id);
    onNoteDelete();
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Note title"
      />
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="Note content"
      />
      <select value={category} onChange={handleCategoryChange}>
        <option value="">All categories</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
      </select>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default NoteEditor;