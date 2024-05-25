import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Tasklist from './pages/Tasklist'
import { Routes,Route } from 'react-router-dom'
import Edittask from './pages/Edittask'

function App() {
  

  return (
    <div className='w-screen h-screen'>
      <Routes>
      <Route path='/' element={<Tasklist/>}/>
      <Route path='/create' element={<Edittask/>}/>
      <Route path='/edit/:id' element={<Edittask/>}/>
      </Routes>
      
    </div>
  )
}

export default App
