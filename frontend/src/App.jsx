import Home from './Components/Home/Home'
import StatSelect from './Components/StatCreator/StatSelect/StatSelect'
import { BrowserRouter, Route, Routes } from 'react-router'
import { UserProvider } from './Context/UserContext'
import StatPreview from './Components/StatCreator/StatPreview/StatPreview'
import StatCreator from './Components/StatCreator/StatEditor/StatEditor'
import Login from './Components/Login/Login'
import Register from './Components/Login/Register/Register'

function App() {

  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route index element={<Home/>}/>
            <Route path='stat-select' element={<StatSelect/>}/>
            <Route path='stat-creator' element={<StatCreator/>}/>
            <Route path='stat-creator/preview' element={<StatPreview/>}/>
            <Route path='stat-creator/editor' element={<StatCreator/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='login/register' element={<Register/>}/>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  )
}

export default App
