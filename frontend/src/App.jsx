import AuthProvider from "./context/AuthContext"
import AppRouter from "./components/AppRouter"

function App() {

  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App
