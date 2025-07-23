import Home from './Components/Home/Home'
import { BrowserRouter, Route, Routes } from 'react-router'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
