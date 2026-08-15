import React from 'react';

interface Note {
  id: number;
  title: string;
  content: string;
  category: string;
}

interface NoteProps {
  note: Note;
  onDelete: (id: number) => void;
  onEdit: (id: number, updatedNote: Note) => void;
}

const Note: React.FC<NoteProps> = ({ note, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [updatedNote, setUpdatedNote] = React.useState(note);

  const handleDelete = () => {
    onDelete(note.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(note.id, updatedNote);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedNote({ ...updatedNote, title: e.target.value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedNote({ ...updatedNote, content: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUpdatedNote({ ...updatedNote, category: e.target.value });
  };

  return (
    <li>
      {isEditing ? (
        <div>
          <input type="text" value={updatedNote.title} onChange={handleTitleChange} />
          <textarea value={updatedNote.content} onChange={handleContentChange} />
          <select value={updatedNote.category} onChange={handleCategoryChange}>
            <option value="">All categories</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
          </select>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <p>Category: {note.category}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </li>
  );
};

export default Note;