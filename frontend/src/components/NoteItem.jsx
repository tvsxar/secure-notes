import editButton from '../assets/edit.svg';
import trashButton from '../assets/trash.svg';

// Context
import { useContext } from 'react';
import { NotesContext } from '../context/NotesContext';

function NoteItem({ note }) {
    const { setNotes, setModal, setSelectedNote, handleDeleteNote } = useContext(NotesContext);
    
    function handleOpenModal(mode = 'edit') {
        setModal({
            isOpen: true,
            mode
        });
        setSelectedNote(note);
    }

    function handleCloseModal() {
        setModal({
            isOpen: false,
            mode: 'add'
        });
    }

    function handleDeleteNoteClick() {
        handleCloseModal();
        handleDeleteNote(note.id);
        setNotes(prev => prev.filter(noteItem => noteItem.id !== note.id));
    }

    function formatDate(dateString) {
        const date = new Date(dateString);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    return (
        <div className="flex flex-col gap-4 rounded-xl border-gray-300 
        border-1 w-full max-w-full min-h-[15rem] py-4 px-3
        hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
                <h3 className='font-black'>{note.title}</h3>

                <div className="flex items-center gap-2 select-none">
                    <button onClick={() => handleOpenModal('edit')}
                    className='cursor-pointer hover:bg-gray-200 hover:rounded-md'>
                        <img src={editButton} alt="Edit" className='h-6 w-6' />
                    </button>
                    <button onClick={handleDeleteNoteClick}
                    className='cursor-pointer hover:bg-gray-200 hover:rounded-md'>
                        <img src={trashButton} alt="Trash" className='h-6 w-6' />
                    </button>
                </div>
            </div>

            <div className="text-sm line-clamp-4">
                <p>{note.description}</p>
            </div>

            <div className="text-xs text-gray-400 select-none">
                <p>{formatDate(note.created_at)}</p>
            </div>
        </div>
    )
}

export default NoteItem;