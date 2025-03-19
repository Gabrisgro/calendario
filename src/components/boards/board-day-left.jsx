import { useContext } from "react";
import { ContextDate } from "../context/ContextDate";

export default function BoardDayLeft(){

    const {currentDate, daySelected} = useContext(ContextDate);

    const mesi=['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];

    const nomeMese = mesi[currentDate.getMonth()];

    return(
        <div className="board-left-container">
            <h1>{`${daySelected} ${nomeMese}`}</h1>
        </div>
    )
}