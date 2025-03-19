import { useContext, useEffect, useState } from "react"
import { ContextDate } from "../context/ContextDate"
import { ContextTasks } from "../context/ContextTasks";

export default function BoardWeek(){

    const {currentDate, setCurrentDate, daySelected, setDaySelected} = useContext(ContextDate);
    const {taskOpen, setTaskOpen, setSelectedCell, selectedCell, mapValues} = useContext(ContextTasks);
    const daysOfWeek = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];

        // Stato per memorizzare la data di inizio della settimana
    const [startDate, setStartDate] = useState(() => {
        const today = new Date();
        today.setDate(today.getDate() - today.getDay()); // Imposta la data alla domenica della settimana corrente
        return today;
    });

    // Funzione per generare i giorni della settimana e i <td>
    const renderWeekDays = (startDate) => {
        const days = [];
        for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        days.push(
            <td key={i}>
            {currentDate.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })}
            </td>
        );
        }
        return days;
    };

    const goToPreviousWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - 7);
        setCurrentDate(newDate);
    };

    const goToNextWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + 7);
        setCurrentDate(newDate);
    };

    function getFormattedDate(date){
        return `${daySelected}-${date.getMonth()}-${date.getFullYear()}`;
    }
    
    let FormattedDate = getFormattedDate(currentDate);
    
    //aggiornare ogni volta la data formattata
    useEffect(()=>{
        FormattedDate = getFormattedDate(currentDate);
    }, [currentDate])

    return(
        <div>
            <table>
                <thead>
                    <tr>
                    {daysOfWeek.map((day, index) => (
                        <th key={index}>
                            {day}
                        </th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {/*weekDates.map((date, index) => (
                            <td key={index} className="number-day-week"
                            onClick={()=>{
                                setTaskOpen(!taskOpen);
                                setSelectedCell(!selectedCell);
                                setDaySelected(date.getDate());
                            }}>
                                <p>{date.getDate()}</p>
                            </td>
                        ))*/renderWeekDays(startDate)}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}