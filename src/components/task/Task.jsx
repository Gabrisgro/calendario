import { useContext, useEffect, useState } from "react";
import { ContextDate } from "../context/ContextDate";
import { ContextTasks } from "../context/ContextTasks";
import TaskInput from "./Task-input";
import TaskContainer from "./Task-container";
import TaskFooter from "./Task-footer";
import './task.css';

export default function Task(){

    const {currentDate, daySelected} = useContext(ContextDate);
    const {list, setList, mapValues, setMapValues, taskOpen} = useContext(ContextTasks);
    const [selectedCell, setSelectedCell] = useState(false);

    //funzione per formattare la data e quindi chiave della mia mappa
    function getFormattedDate(date){
        return `${daySelected}-${date.getMonth()}-${date.getFullYear()}`;
    }
    
    let FormattedDate = getFormattedDate(currentDate);
    
    //aggiorna la data formattata
    useEffect(()=>{
        FormattedDate = getFormattedDate(currentDate);
    }, [currentDate])

    //per aggiungere task
    function handleAddClick(task){
        const newList = [...list, task];
        setList(newList);
        addKeyValue(FormattedDate, task); 
    }

    let i = 0;
    //aggiungo chiavi e valori alla mappa
    function addKeyValue(key, value){
        if (!(key in mapValues)){
            setMapValues(prevMap => ({
            ...prevMap, // Copia tutte le chiavi esistenti
            [key]: {id: i, task: [value]} // Aggiungi la nuova chiave con il valore associato
            }));
            i++;
        }else{
            setMapValues(prevMap => ({
            ...prevMap, // Copia tutte le chiavi esistenti
            [key]: [...(prevMap[key].task || []), value] // Aggiungi il nuovo valore alla chiave esistente
            }));
        }
    }

    console.log(mapValues);

    const mesi=['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];

    const nomeMese = mesi[currentDate.getMonth()];

    return (
        <div className={taskOpen ? 'sidebar-visible' : 'sidebar-not-visible'}>
            <h1>{`${daySelected} ${nomeMese}`}</h1>
            <TaskInput handleAddClick={handleAddClick} FormattedDate={FormattedDate}/>
            <TaskContainer FormattedDate={FormattedDate}/>
            <TaskFooter selectedCell={selectedCell} setSelectedCell={setSelectedCell}/>
        </div>
    )
}