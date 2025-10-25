// Components & Context
import NoteItem from '../components/NoteItem';
import AddNoteButton from '../components/AddNoteButton';
import SearchBar from '../components/SearchBar';

// Context
import { useContext, useEffect } from 'react';
import { NotesContext } from '../context/NotesContext';
import { AuthContext } from '../context/AuthContext';

function NotesPage() {

    const { notes, handleGetNotes, notesLoading, notesError } = useContext(NotesContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        handleGetNotes();
    }, []);

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center text-gray-500">Loading user data...</div>
            </div>
        )
    }

    return (
        <div className="py-5 bg-gray-100 min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40">
            <div className="flex flex-col gap-10">
                <div className="text-center mt-8 px-4 sm:px-6 lg:px-0">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Welcome, {user.username}!</h1>

                    <p className="text-sm sm:text-md lg:text-lg text-gray-500 mt-2 max-w-2xl mx-auto">
                        This is your place to gather your ideas, track your tasks, and stay inspired.
                        Every note you write brings clarity and helps you stay ahead.
                    </p>
                </div>

                <AddNoteButton />

                <SearchBar />

                {notesLoading ? (
                    <div className="text-center text-gray-500">Loading notes...</div>
                ) : notesError ? (
                    <div className="text-center text-red-500">{notesError}</div>
                ) : notes.length === 0 ? (
                    <div className="text-center text-gray-500">No notes found. Start by adding a new note!</div>
                ) : (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {notes?.map(note => note && (
                            <NoteItem key={note.id} note={note} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default NotesPage;