import addIcon from '../assets/add.svg';
import searchIcon from '../assets/search-outline.svg';

import NoteItem from '../components/NoteItem';

function NotesPage() {
    return (
        <div className="py-5 bg-gray-100 min-h-screen px-50">
            <div className="flex flex-col gap-10">
                <div className="text-center mt-8">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome, tvsxar!</h1>

                    <p className="text-gray-500 text-md mt-2">
                        This is your place to gather your ideas, track your tasks, and stay inspired. <br />
                        Every note you write brings clarity and helps you stay ahead.
                    </p>
                </div>

                <button className='select-none flex flex-col gap-2 items-center cursor-pointer
                justify-center bg-gray-200 p-8 rounded-xl border-gray-400 border-1 border-dashed 
                hover:shadow-md active:scale-99 transition-all duration-300'>
                    <img src={addIcon} alt="Add" className='h-10 w-10' />

                    <p>Add New Note</p>
                </button>

                <form className='flex items-center gap-2 bg-gray-200 rounded-md px-3 py-2
                text-sm transition duration-300 focus-within:shadow-md'>
                    <img src={searchIcon} alt="Search"
                    className='h-4 w-4 opacity-50' />
                    <input 
                    type="text" 
                    placeholder='Search notes...'
                    className='border-none rounded-md bg-gray-200 w-full  
                    placeholder:text-sm focus:outline-none' />
                </form>

                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <NoteItem />
                    <NoteItem />
                    <NoteItem />
                    <NoteItem />
                    <NoteItem />
                    <NoteItem />
                    <NoteItem />
                    <NoteItem />
                    <NoteItem />
                    <NoteItem />
                </div>
            </div>
        </div>
    )
}

export default NotesPage;