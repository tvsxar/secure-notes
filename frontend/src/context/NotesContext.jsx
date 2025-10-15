import { createContext, useState, useEffect } from "react";
import api from '../utilities/axios';

const NotesContext = createContext(null);

function NotesProvider({children}) {
    const [ notes, setNotes ] = useState([]);
    const [ notesLoading, setNotesLoading ] = useState(false);
    const [ notesError, setNotesError ] = useState(null);

    useEffect(() => {
        handleGetNotes();
    }, []);

    async function handleAddNewNote(noteData) {
        try {
            setNotesLoading(true);
            setNotesError(null)
            const response = await api.post('/notes', noteData)
            const { note } = response.data;

            if (!note) {
                setNotesError("Error adding new note!");
                return;
            }

            setNotes(prev => ([...prev, note]))
        } catch (error) {
            console.error(error);
            setNotesError("Something went wrong, please try again.");
        } finally {
            setNotesLoading(false)
        }
    }

    async function handleGetNotes() {
        try {
            setNotesLoading(true);
            setNotesError(null)
            const response = await api.get('/notes');
            const { notes: fetchedNotes } = response.data;

            if (!fetchedNotes) {
                setNotesError("Error getting notes!");
                return;
            }

            setNotes(fetchedNotes);
        } catch (error) {
            console.error(error);
            setNotesError("Something went wrong, please try again.");
        } finally {
            setNotesLoading(false);
        }
    }

    async function handleUpdateNote(id, noteData) {
        try {
            setNotesLoading(true);
            setNotesError(null)
            const response = await api.put(`/notes/${id}`, noteData);
            const { note } = response.data;

            if (!note) {
                setNotesError("Error updating notes!");
                return;
            }

            setNotes(prevNotes => prevNotes.map(noteItem => {
                return noteItem.id === id ? note : noteItem;
            }));
        } catch (error) {
            console.error(error);
            setNotesError("Something went wrong, please try again.");
        } finally {
            setNotesLoading(false);
        }
    }

    async function handleDeleteNote(id) {
        try {
            setNotesLoading(true);
            setNotesError(null)
            await api.delete(`/notes/${id}`);

            setNotes(prevNotes => prevNotes.filter(noteItem => noteItem.id !== id));
        } catch (error) {
            console.error(error);
            setNotesError("Something went wrong, please try again.");
        } finally {
            setNotesLoading(false);
        }
    }

    return (
        <NotesContext.Provider value={{
            notes, setNotes,
            notesLoading, setNotesLoading,
            notesError, setNotesError,
            handleAddNewNote, handleGetNotes,
            handleUpdateNote, handleDeleteNote
        }}>
            {children}
        </NotesContext.Provider>
    )
}

export { NotesContext };
export default NotesProvider; 