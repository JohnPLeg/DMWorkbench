import Home from './Components/Home/Home'
import { BrowserRouter, Route, Routes } from 'react-router'
import { UserProvider } from './Context/UserContext'

function App() {

  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route index element={<Home/>}/>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  )
}

export default App
