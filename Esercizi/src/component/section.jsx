function Section (props) {
    return (
        <section>
            <h1>{props.titolo}</h1>
            <h2>{props.sottotitolo}</h2>
            <p>{props.paragrafo}</p>
        </section>
    )
}

export default Section