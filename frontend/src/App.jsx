import AuthProvider from "./context/AuthContext"
import AppRouter from "./components/AppRouter"
import NotesProvider from "./context/NotesContext"

function App() {

  return (
    <AuthProvider>
      <NotesProvider>
        <AppRouter />
      </NotesProvider>
    </AuthProvider>
  )
}

export default App
