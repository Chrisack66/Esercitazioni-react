import './App.css'
import Section from './component/section'
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
      {frasi.map ((x, index) => (<Section key = {index} paragrafo = {x.paragrafo} button = {x.button}></Section>) )}

    </>
  )
}

export default App

