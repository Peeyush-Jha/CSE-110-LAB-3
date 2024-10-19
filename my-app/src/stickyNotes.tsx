import './App.css';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constant"; // Import the dummyNotesList from the appropriate module
import { ToggleTheme } from './hooksExercise'; // Import the custom hook from the appropriate module
import { useState } from 'react';
export const StickyNotes = () => {
    // your code from App.tsx
  const [favorites, setFavorites] = useState<Note[]>([]);
  const [notes, setNotes] = useState(dummyNotesList);

  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };
  const [createNote, setCreateNote] = useState(initialNote);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Function to toggle a note as favorite
  const handleFavoriteToggle = (note: Note) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.find((fav) => fav.id === note.id)) {
        // If the note is already in favorites, remove it
        return prevFavorites.filter((fav) => fav.id !== note.id);
      } else {
        // If the note is not in favorites, add it
        return [...prevFavorites, note];
      }
    });
  };

  // Function to create a new note
  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    createNote.id = notes.length + 1;
    setNotes([createNote, ...notes]);
    setCreateNote(initialNote);
  };

  // Function to check if a note is a favorite
  const isFavorite = (note: Note) => {
    return favorites.some((fav) => fav.id === note.id);
  };

  // Function to delete a note
  const deleteNoteHandler = (noteId: number) => {
    setNotes(notes.filter(note => note.id !== noteId));
    setFavorites(favorites.filter(fav => fav.id !== noteId));
  };

  // Function to handle editing of a note
  const handleNoteEdit = (note: Note) => {
    setSelectedNote(note);
  };

  // Function to save the edited note
  const saveNoteHandler = () => {
    if (selectedNote) {
      setNotes(notes.map(note => note.id === selectedNote.id ? selectedNote : note));
      setSelectedNote(null);
    }
  };

  return (
    <div className='app-container'>
      <form className="note-form" onSubmit={createNoteHandler}>
        <div>
          <input
            placeholder="Note Title"
            value={createNote.title}
            onChange={(event) =>
              setCreateNote({ ...createNote, title: event.target.value })}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Note Content"
            value={createNote.content}
            onChange={(event) =>
              setCreateNote({ ...createNote, content: event.target.value })}
            required
          />
        </div>
        <div>
          <select
            value={createNote.label}
            onChange={(event) =>
              setCreateNote({ ...createNote, label: event.target.value as Label })}
            required
          >
            <option value={Label.personal}>Personal</option>
            <option value={Label.study}>Study</option>
            <option value={Label.work}>Work</option>
            <option value={Label.other}>Other</option>
          </select>
        </div>
        <div><button type="submit">Create Note</button></div>
      </form>

      <div className="notes-grid">
        {notes.map((note) => (
          <div
            key={note.id}
            className="note-item">
            <div className="notes-header">
            <button onClick={() => handleFavoriteToggle(note)}>
                {isFavorite(note) ? '❤️' : '🤍'}
              </button>
              <button onClick={() => deleteNoteHandler(note.id)}>x</button>
              
            </div>
            <h2
              contentEditable={true}
              suppressContentEditableWarning={true}
              onBlur={(e) => setSelectedNote({ ...note, title: e.target.textContent || "" })}
            >
              {note.title}
            </h2>
            <p
              contentEditable={true}
              suppressContentEditableWarning={true}
              onBlur={(e) => setSelectedNote({ ...note, content: e.target.textContent || "" })}
            >
              {note.content}
            </p>
            <p> {note.label} </p>
            <button onClick={() => handleNoteEdit(note)}>Edit</button>
          </div>
        ))}
      </div>

      {selectedNote && (
        <div className="edit-note">
          <h3>Editing Note: {selectedNote.title}</h3>
          <button onClick={saveNoteHandler}>Save Changes</button>
        </div>
      )}

      <button>{ToggleTheme()}</button>

      <div>
        <h3>List of Favorites</h3>
        <ul>
          {favorites.map((note) => (
            <li key={note.id}>{note.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}