import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
    const { user } = useContext(AuthContext);

    return (
        <nav className="flex items-center justify-between border-b-2 border-gray-200 p-3">
            <h1 className='font-semibold text-lg'><Link to='/'>Notedly</Link></h1>

            {!user ? (
                <div className="flex gap-4">
                    <button className='text-white text-sm bg-black rounded-md px-3 h-8 cursor-pointer hover:bg-black/80 duration-200'><Link to="/account?mode=login">Sign In</Link></button>
                    <button className='text-white text-sm bg-black rounded-md px-3 h-8 cursor-pointer hover:bg-black/80 duration-200'><Link to="/account?mode=register">Sign Up</Link></button>
                </div>
            ) : (
                <button className='cursor-pointer bg-red-500 text-sm px-3 h-8 rounded-md text-white'>Logout</button>
            )}
        </nav>
    )
}

export default Navbar;