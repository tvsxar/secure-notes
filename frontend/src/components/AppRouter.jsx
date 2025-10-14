import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import AccountPage from '../pages/AccountPage';

function AppRouter() {

    return (
        <Router>
            <Navbar />

            <Routes>
                <Route path='/account' element={<AccountPage />} />
            </Routes>
      </Router>
    )
}

export default AppRouter;