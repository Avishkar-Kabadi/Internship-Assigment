import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage.jsx"
function App() {

  return (
    <>
      <Routes>
        <Route>
          <Route path="/" element={<LoginPage />} />
        </Route>
      </Routes>

    </>
  )
}

export default App
