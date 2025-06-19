import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Agenda from './Components/Agenda'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Agenda></Agenda>
    </>
  )
}

export default App
