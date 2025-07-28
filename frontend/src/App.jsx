import Home from './Components/Home/Home'
import StatSelect from './Components/StatCreator/StatSelect/StatSelect'
import { BrowserRouter, Route, Routes } from 'react-router'
import { UserProvider } from './Context/UserContext'
import StatCreator from './Components/StatCreator/StatCreator/StatCreator'

function App() {

  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route index element={<Home/>}/>
            <Route path='stat-select' element={<StatSelect/>}/>
            <Route path='stat-creator' element={<StatCreator/>}/>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  )
}

export default App
