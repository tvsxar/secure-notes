// Components & Context
import NoteItem from '../components/NoteItem';
import AddNoteButton from '../components/AddNoteButton';
import SearchBar from '../components/SearchBar';

// Context
import { useContext } from 'react';
import { NotesContext } from '../context/NotesContext';
import { AuthContext } from '../context/AuthContext';

function NotesPage() {

    const { notes } = useContext(NotesContext);
    const { user } = useContext(AuthContext);

    return (
        <div className="py-5 bg-gray-100 min-h-screen px-50">
            <div className="flex flex-col gap-10">
                <div className="text-center mt-8">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.username}!</h1>

                    <p className="text-gray-500 text-md mt-2">
                        This is your place to gather your ideas, track your tasks, and stay inspired. <br />
                        Every note you write brings clarity and helps you stay ahead.
                    </p>
                </div>

                <AddNoteButton />

                <SearchBar />

                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {notes?.map(note => note && (
                        <NoteItem key={note.id} note={note} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NotesPage;