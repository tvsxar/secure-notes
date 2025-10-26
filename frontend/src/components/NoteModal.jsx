import closeIcon from '../assets/close-sharp.svg';

// Context
import { useContext } from 'react';
import { NotesContext } from '../context/NotesContext';

// State        
import { useState } from 'react';

function NoteModal() {
    const { modal, setModal, selectedNote, handleAddNewNote, handleUpdateNote } = useContext(NotesContext);

    const isEditMode = modal.mode === 'edit';

    const [noteData, setNoteData] = useState({
        title: isEditMode && selectedNote ? selectedNote.title : '',
        description: isEditMode && selectedNote ? selectedNote.description : ''
    });

    function handleCloseModal() {
        setModal({
            isOpen: false,
            mode: 'add'
        });
        setNoteData({ title: '', description: '' });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // Handle add or edit note logic
        if(isEditMode) {
            await handleUpdateNote(selectedNote.id, noteData);
        } else {
            await handleAddNewNote(noteData);
        }

        handleCloseModal();
    }

    return (
        <div onClick={handleCloseModal}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl p-4 max-w-xl mx-auto shadow-sm">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">{!isEditMode ? 'Add New Note' : 'Update Note'}</h2>
    
                    <button className='cursor-pointer'
                    onClick={() => handleCloseModal()}>
                        <img src={closeIcon} alt="close" className='w-8 h-8' />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4 mt-6 w-md">
                        <input type="text" 
                        placeholder='Title' 
                        className='bg-gray-100 text-gray-800 text-sm rounded-md px-4 py-2 outline-none w-full' 
                        value={noteData.title}
                        onChange={e => setNoteData(prev => ({...prev, title: e.target.value}))} />

                        <textarea type="text" 
                        placeholder='Description' 
                        className='bg-gray-100 max-h-50 min-h-25 text-gray-800 text-sm rounded-xl px-4 py-2 outline-none w-full' 
                        value={noteData.description}
                        onChange={e => setNoteData(prev => ({...prev, description: e.target.value}))} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6 font-medium">
                        <button type='button' 
                        onClick={() => handleCloseModal()}
                        className='cursor-pointer rounded-md bg-gray-100 p-2 hover:bg-gray-200'>
                            Cancel
                        </button>

                        <button type="submit" className='cursor-pointer rounded-md bg-black text-white p-2 hover:bg-black/80'>
                            {!isEditMode ? 'Add Note' : 'Update Note'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NoteModal;