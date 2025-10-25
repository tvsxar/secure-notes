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
            justify-center bg-gray-200 p-6 sm:p-8 md:p-10 rounded-xl border-gray-400 border-1 border-dashed 
            hover:shadow-md active:scale-99 transition-all duration-300'>
            <img src={addIcon} alt="Add" className='h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12' />
        
            <p className='text-sm sm:text-base md:text-md font-medium text-gray-800 text-center'>Add New Note</p>
        </button>
    )
}

export default AddNoteButton;