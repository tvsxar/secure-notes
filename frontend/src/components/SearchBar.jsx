import searchIcon from '../assets/search-outline.svg';

function SearchBar({ setSearchTerm, searchTerm }) {
    return (
        <form className='flex items-center gap-2 bg-gray-200 rounded-md px-3 py-2
            text-sm transition duration-300 focus-within:shadow-md'>
            
            <img src={searchIcon} alt="Search"
                className='h-4 w-4 opacity-50' />
                            
            <input 
                type="text" 
                placeholder='Search notes...'
                className='border-none rounded-md bg-gray-200 w-full  
                placeholder:text-sm focus:outline-none'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)} />
        </form>
    )
}

export default SearchBar;