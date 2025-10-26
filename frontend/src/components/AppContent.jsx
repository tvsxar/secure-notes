import AppRouter from "./AppRouter"
import { NotesContext } from "../context/NotesContext";
import NoteModal from "./NoteModal";
import { useContext } from "react";

function AppContent() {
    const { modal } = useContext(NotesContext);

    return (
        <div className="App">
            <AppRouter />

            {modal.isOpen && <NoteModal />}
        </div>
    )
}

export default AppContent;