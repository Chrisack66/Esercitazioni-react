import { useEffect, useState } from "react";
function Semaforo() {
  const [light, setLight] = useState("red");
  const stileLuci = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
  };

  //useEffect è un hook di React che consente di gestire funzioni in modo tale da evitare il re-rendering di un componente ogni volta che cambia il suo stato. Accetta due parametri: la funzione da eseguire, come arrow function, e un array di dipendenze.
            useEffect (()=>{
            const intervallo = setInterval(() =>
            light === "red"
            ? setLight("yellow")
            : light === "yellow"
            ? setLight("green")
            : setLight("red"), 2000)
            return () => clearInterval(intervallo)
            }, [light])

            //3 opzioni per l'array di dipendenze:
            //array di dipendenze omesso: l'effetto si esegue ogni volta che cambia qualunque cosa all'interno del componente.
            //array di dipendenze vuoto: l'effetto si esegue solo una volta, al montaggio del componente, anche se cambia il suo stato interno, lo esegue solo una volta se aggiorno la pagina
            //array di dipendenze pieno: l'effetto si esegue ogni volta che cambia il valore delle dipendneze (costanti) stesse
  
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
        }}
      >
        <div
          className={light === "red" ? "red" : "default"}
          style={stileLuci}
        ></div>
        <div
          className={light === "yellow" ? "yellow" : "default"}
          style={stileLuci}
        ></div>
        <div
          className={light === "green" ? "green" : "default"}
          style={stileLuci}
        ></div>
      </div>
      <button>
        Cambia luce
      </button>
    </>
  );
}
export default Semaforo;