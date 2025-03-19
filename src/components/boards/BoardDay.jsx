import { useContext, useEffect } from "react";
import BoardDayLeft from "./board-day-left";
import BoardDayRight from "./board-day-right";
import { ContextDate } from "../context/ContextDate";
import { ContextVisible } from "../context/ContextVisible";

export default function BoardDay(){

    const {currentDate, daySelected} = useContext(ContextDate);
    const {handleDAYorMonth} = useContext(ContextVisible);

    function getFormattedDate(date){
        return `${daySelected}-${date.getMonth()}-${date.getFullYear()}`;
    }
        
    let FormattedDate = getFormattedDate(currentDate);
        
    //aggiornare ogni volta la data formattata
    useEffect(()=>{
        FormattedDate = getFormattedDate(currentDate);
    }, [currentDate])

    return(
        <>
            <div className="arrow-button-day">
                <i className="fa-solid fa-arrow-left" onClick={handleDAYorMonth}></i>
            </div>
            <div className="board-day-container">
                <BoardDayLeft />
                <div className="board-day-splitter"></div>
                <BoardDayRight FormattedDate={FormattedDate}/>
            </div>
        </>
    )
}