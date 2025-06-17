import Button from "./button"

function Section (props) {
    function handleClick() {
        console.log(props.paragrafo)
    }
    let toggle = true;
    function handleToggle() {
        toggle=!toggle;
    }
    

    return (
        <section>
            <Button label="toggle" funzione={handleToggle}></Button>
            <h1>{props.titolo}</h1>
            <h2>{props.sottotitolo}</h2>
            <p style = {{color: "red", fontSize: "24px"}}>{toggle? props.paragrafo: "testo non disponibile"}</p>
            <Button label={props.button} funzione={handleClick}></Button>
            {toggle? <p>Il toggle è a true</p>: <Button label= "Il button è a false"></Button>}
        </section>
    )
}

export default Section

//creare un pulsante toggle che al click o renderizza le props paragrafo, o "testo non disponibile".