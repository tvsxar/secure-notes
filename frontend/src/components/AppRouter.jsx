import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NotesContext } from '../context/NotesContext';

// Import components
import Navbar from './Navbar';

// Import pages
import AccountPage from '../pages/AccountPage';
import WelcomePage from '../pages/WelcomePage';
import NotFoundPage from '../pages/NotFoundPage';
import NotesPage from '../pages/NotesPage';

function AppRouter() {
    const { user } = useContext(AuthContext);

    return (
        <Router>
            <Navbar />

            <Routes>
                <Route path='/' element={!user ? <WelcomePage /> : <Navigate to='/notes' replace />} />

                <Route path='/notes' element={user ? <NotesPage /> : <Navigate to='/' replace />} />

                <Route path='/account' element={<AccountPage />} />

                <Route path='*' element={<NotFoundPage />} />
            </Routes>
      </Router>
    )
}

export default AppRouter;