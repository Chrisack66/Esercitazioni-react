import { useState } from "react"
function Agenda() {
    const [modifica, setModifica] = useState(false)
    const [data, setData] = useState(new Date())
    const [newTask, setNewTask] = useState("")
    const [fixTask, setFixTask] = useState([])
    const fasceOrarie = [
  { inizio: "09:00", fine: "10:00" },
  { inizio: "10:00", fine: "11:00" },
  { inizio: "11:00", fine: "12:00" },
  { inizio: "12:00", fine: "13:00" },
  { inizio: "13:00", fine: "14:00" },
  { inizio: "14:00", fine: "15:00" },
  { inizio: "15:00", fine: "16:00" },
  { inizio: "16:00", fine: "17:00" },
  { inizio: "17:00", fine: "18:00" }
];

function aggiungiTask(oraInizio, oraFine) {
setModifica(true)
setNewTask({orario:oraInizio})
}

function handleTask(task) {
setFixTask([...fixTask, task])
}

    return(
        <>
        <div className="agenda">
            <h4>{data.toLocaleDateString()}</h4>
            <h2>To do list</h2>
            <div className="righe">
            {fasceOrarie.map((ora)=> <div onClick={()=> aggiungiTask(ora.inizio, ora.fine)}>{ora.inizio}</div>)}
            {modifica&& <form onSubmit={()=>handleTask(newTask)}><input type="text" onChange={(event)=> setNewTask({...newTask, task: event.target.value})}></input><button type="submit">Modifica</button></form>}
            </div>
            <p>{newTask.orario}-{newTask.task}</p>
        </div>
        {fixTask.map((task)=> <div>{task.task}</div>)}
        </>
    )
}

export default Agenda