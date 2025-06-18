import { useEffect, useState } from "react"


function Orologio() {
    const [orario, setOrario] = useState(new Date())
    useEffect(()=> {
        const intervallo = setInterval(()=> {setOrario(new Date())}, 1000)
        return ()=> clearInterval(intervallo)
    }, [])
    return (
        <h1> {orario.toLocaleString()} </h1>
    )
}

export default Orologio