// src/utils/cache.ts
import { Note } from '../Note';

interface CacheItem {
  data: Note[];
  expiresAt: number;
}

class Cache {
  private cache: { [key: string]: CacheItem } = {};
  private ttl: number = 60 * 1000; // 1 minute

  get(key: string): Note[] | undefined {
    const item = this.cache[key];
    if (!item) return undefined;
    if (item.expiresAt < Date.now()) {
      delete this.cache[key];
      return undefined;
    }
    return item.data;
  }

  set(key: string, data: Note[]): void {
    this.cache[key] = {
      data,
      expiresAt: Date.now() + this.ttl,
    };
  }

  clear(key: string): void {
    delete this.cache[key];
  }

  clearAll(): void {
    this.cache = {};
  }
}

const cache = new Cache();

export function getNotesFromCache(): Note[] | undefined {
  return cache.get('notes');
}

export function setNotesInCache(notes: Note[]): void {
  cache.set('notes', notes);
}

export function clearNotesCache(): void {
  cache.clear('notes');
}

export function clearAllCache(): void {
  cache.clearAll();
}
```

```typescript
// src/utils/storage.ts (updated to use cache)
import { getNotesFromCache, setNotesInCache, clearNotesCache } from './cache';
import { Note } from '../Note';

const storageKey = 'notes';

export function loadNotes(): Note[] {
  const cachedNotes = getNotesFromCache();
  if (cachedNotes) return cachedNotes;
  const storedNotes = localStorage.getItem(storageKey);
  if (!storedNotes) return [];
  const notes: Note[] = JSON.parse(storedNotes);
  setNotesInCache(notes);
  return notes;
}

export function saveNotes(notes: Note[]): void {
  setNotesInCache(notes);
  localStorage.setItem(storageKey, JSON.stringify(notes));
}

export function clearNotes(): void {
  clearNotesCache();
  localStorage.removeItem(storageKey);
}
```

```typescript
// src/App.tsx (updated to use cache)
import React, { useState, useEffect } from 'react';
import { loadNotes, saveNotes, clearNotes } from './utils/storage';
import NoteForm from './NoteForm';
import Note from './Note';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const loadedNotes = loadNotes();
    setNotes(loadedNotes);
  }, []);

  const handleAddNote = (newNote: Note) => {
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const handleRemoveNote = (id: number) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  return (
    <div>
      <NoteForm onAddNote={handleAddNote} />
      {notes.map((note) => (
        <Note key={note.id} note={note} onRemove={handleRemoveNote} />
      ))}
    </div>
  );
}

export default App;