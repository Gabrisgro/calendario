import { useContext, useState, useEffect } from "react";
import { ContextDate } from "../context/ContextDate";
import { ContextTasks } from "../context/ContextTasks";
import './board.css';
import { ContextVisible } from "../context/ContextVisible";

function Board(){

    const {daySelected, setDaySelected, currentDate, Today, ThisMonth, ThisYear} = useContext(ContextDate);
    const {setTaskOpen, taskOpen, mapValues, selectedCell, setSelectedCell} = useContext(ContextTasks);
    const [thereAreTasks, setThereAreTasks] = useState(false);
    const {handleDAYorMonth} = useContext(ContextVisible);

    //funzione data formattata che mi serve come chiave per la mappa delle tasks
    function getFormattedDate(date){
        return `${daySelected}-${date.getMonth()}-${date.getFullYear()}`;
    }
    
    let FormattedDate = getFormattedDate(currentDate);
    
    //aggiornare ogni volta la data formattata
    useEffect(()=>{
        FormattedDate = getFormattedDate(currentDate);
    }, [currentDate])

    //funzione per quanti giorni ho alla settimana
    const daysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };
    
    // Funzione per ottenere il giorno della settimana del primo giorno del mese
    const firstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    };

    //funzione per renderizzare il calendario
    function renderCalendar(){
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const totalDays = daysInMonth(month, year);
        const firstDay = firstDayOfMonth(month, year);
    
        const weeks = [];
        let days = [];
    
        // Riempie i giorni vuoti prima del primo giorno del mese
        for (let i = 0; i < firstDay; i++) {
            days.push(<td key={`empty-${i}`}></td>);
        }
    
        // Riempie i giorni del mese
        for (let day = 1; day <= totalDays; day++) {
        const newFormattedDate = `${day}-${month}-${year}`;
    
        days.push(
            <td key={day} onClick={() => {
            setTaskOpen(!taskOpen);
            setDaySelected(day);
            setSelectedCell(!selectedCell);
            }} className={`${selectedCell && day === daySelected ? 'selected-cell' : ''} ${thereAreTasks ? 'there-are-tasks' : ''} td-board`}>
            <p className={`number-day ${day === Today && month === ThisMonth && year === ThisYear ? 'this-day' : ''}`} onClick={handleDAYorMonth}>{day}</p>
            <div className="tasks-in-cell-container">
                {newFormattedDate in mapValues ? mapValues[newFormattedDate].map((value, index) => (
                <p key={index} className="tasks-in-cell">
                    {value}
                </p>
                )) : ''}
            </div>
            </td>
        );
    
        // Se abbiamo 7 giorni o siamo alla fine del mese, crea una nuova riga
        if (days.length === 7 || day === totalDays) {
            weeks.push(<tr key={day}>{days}</tr>);
            days = [];
        }
        }
    
        return weeks;
    }

    return(
            <table>
                <thead>
                    <tr>
                        <th>Dom</th>
                        <th>Lun</th>
                        <th>Mar</th>
                        <th>Mer</th>
                        <th>Giov</th>
                        <th>Ven</th>
                        <th>Sab</th> 
                    </tr>
                </thead>
                <tbody>
                    {renderCalendar()}
                </tbody>
            </table>
    )
}

export default Board;