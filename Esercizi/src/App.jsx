import './App.css'
import Section from './component/section'
function App() {
const frasi = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Seconda frase",
  "Terza frase",
]  



  return (
    <>
      {frasi.map ((x) => (<Section paragrafo = {x}></Section>) )}

    </>
  )
}

export default App

