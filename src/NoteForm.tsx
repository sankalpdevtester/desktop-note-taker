import React, { useState } from 'react';

interface Note {
  id: number;
  title: string;
  content: string;
  category: string;
}

interface NoteFormProps {
  onAddNote: (newNote: Note) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onAddNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newNote: Note = {
      id: Date.now(),
      title,
      content,
      category,
    };
    onAddNote(newNote);
    setTitle('');
    setContent('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title"
      />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Note content" />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All categories</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
      </select>
      <button type="submit">Add note</button>
    </form>
  );
};

export default NoteForm;