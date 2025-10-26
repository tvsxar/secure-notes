import AuthProvider from "./context/AuthContext"
import AppContent from "./components/AppContent"
import NotesProvider from "./context/NotesContext"

function App() {

  return (
    <AuthProvider>
      <NotesProvider>
        <AppContent />
      </NotesProvider>
    </AuthProvider>
  )
}

export default App
