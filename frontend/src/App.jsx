import Home from './Components/Home/Home'
import StatSelect from './Components/StatCreator/StatSelect/StatSelect'
import { BrowserRouter, Route, Routes } from 'react-router'
import StatPreview from './Components/StatCreator/StatPreview/StatPreview'
import StatCreator from './Components/StatCreator/StatEditor/StatEditor'
import Login from './Components/Login/Login'
import Register from './Components/Login/Register/Register'
import StatBlockHome from './Components/StatBlockHome/StatblockHome'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import Initiative from './Components/Initiative/Initiative'
import NotepadSelect from './Components/Notepad/NotepadSelect'

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route index element={<Home/>}/>
            <Route path='stat-select' element={
              <ProtectedRoute>
                <StatSelect/>
              </ProtectedRoute>
            }/>
            <Route path='stat-creator/preview' element={
              <ProtectedRoute>
                <StatPreview/>
              </ProtectedRoute>
            }/>
            <Route path='stat-creator/editor' element={
              <ProtectedRoute>
                <StatCreator/>
              </ProtectedRoute>
            }/>
            <Route path='login' element={<Login/>}/>
            <Route path='login/register' element={<Register/>}/>
            <Route path ='stat-block-home' element={
              <ProtectedRoute>
                <StatBlockHome/>
              </ProtectedRoute>
            }/>
            <Route path='initiative' element={<Initiative/>}/>
            <Route path ='notepad-select' element={
              <ProtectedRoute>
                <NotepadSelect/>
              </ProtectedRoute>
            }/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
