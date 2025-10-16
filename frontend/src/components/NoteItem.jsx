import editButton from '../assets/edit.svg';
import trashButton from '../assets/trash.svg';

function NoteItem() {
    return (
        <div className="flex flex-col gap-4 rounded-xl border-gray-300 
        border-1 min-w-50 max-w-100 min-h-60 py-4 px-3
        hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
                <h3 className='font-black'>Title Example</h3>

                <div className="flex items-center gap-2 select-none">
                    <button className='cursor-pointer hover:bg-gray-200 hover:rounded-md'>
                        <img src={editButton} alt="Edit" className='h-6 w-6' />
                    </button>
                    <button className='cursor-pointer hover:bg-gray-200 hover:rounded-md'>
                        <img src={trashButton} alt="Trash" className='h-6 w-6' />
                    </button>
                </div>
            </div>

            <div className="text-sm line-clamp-4">
                <p>description example description example description example description example description example description example description example</p>
            </div>

            <div className="text-xs text-gray-400 select-none">
                <p>16/10/2025 at 10:30</p>
            </div>
        </div>
    )
}

export default NoteItem;