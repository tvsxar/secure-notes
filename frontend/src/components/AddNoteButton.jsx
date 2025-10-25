import addIcon from '../assets/add.svg';

// Context
import { useContext } from 'react';
import { NotesContext } from '../context/NotesContext';

function AddNoteButton() {
    const { setModal } = useContext(NotesContext);

    function handleOpenModal(mode = 'add') {
        setModal({
            isOpen: true,
            mode
        });
    }

    return (
        <button onClick={() => handleOpenModal('add')}
        className='select-none flex flex-col gap-2 items-center cursor-pointer
            justify-center bg-gray-200 p-8 rounded-xl border-gray-400 border-1 border-dashed 
            hover:shadow-md active:scale-99 transition-all duration-300'>
            <img src={addIcon} alt="Add" className='h-10 w-10' />
        
            <p>Add New Note</p>
        </button>
    )
}

export default AddNoteButton;