import { useState } from "react"

function Counter() {
    const [counter, setCounter] = useState(0)

    return (
    <>
    <p>Il valore del counter è: {counter}</p>
    <button onClick={()=> setCounter(counter+1)}>Incrementa</button>
    <button onClick={()=> setCounter(counter-1)}>Decrementa</button>
    <button onClick={()=> setCounter(0)}>Reset</button>
    <button onClick={()=> counter>=10? setCounter(0): setCounter(counter+1)}>Max10</button>
    </>
    )
}

export default Counter

//Creare un nuovo componente Orologio usando useState che incrementa di secondo in secondo all'infinito. Non usare setTimeout e setInterval, possibilmente.


