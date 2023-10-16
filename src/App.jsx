import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UfoSearch from './UfoSearch'
import DALLE from './Dalle'
import ufo from './assets/ufo.jpg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<div>
  <h1 className='font-mono bg-slate-100 rounded-md'>Ufo search</h1> 
  <div className='flex items-center justify-center'> 
    <img className='mt-2 h-3 w-4' src={ufo} alt="ufo"/>
  </div>
  <div>
    <UfoSearch/>
  </div>
</div>
    </>
  )
}

export default App
