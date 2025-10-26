import AppRouter from "./components/AppRouter"
import { NotesContext } from "./context/NotesContext";
import NoteModal from "./components/NoteModal";

function AppContent() {
    const { modal } = React.useContext(NotesContext);

    return (
        <div className="App">
            <AppRouter />

            {modal.isOpen && <NoteModal />}
        </div>
    )
}

export default AppContent;