import './App.css'
import Counter from './component/Counter'
import Section from './component/section'
import Semaforo from './component/Semaforo'
import Orologio from './component/Orologio'

function App() {
const frasi = [
  {paragrafo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  button: "cliccami"
  },
  {paragrafo: "Seconda frase",
    button: "info"
  },
  {paragrafo: "Terza frase",
    button: "contattaci"
  }
]  



  return (
    <>
      {/* <Counter></Counter>
      {frasi.map ((x, index) => (<Section key = {index} paragrafo = {x.paragrafo} button = {x.button}></Section>) )} */}
      <Semaforo></Semaforo>
      <Orologio></Orologio>

    </>
  )
}

export default App

