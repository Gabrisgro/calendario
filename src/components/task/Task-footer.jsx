import { useContext } from "react";
import { ContextTasks } from "../context/ContextTasks";

export default function TaskFooter({setSelectedCell, selectedCell}){

    const {setTaskOpen, taskOpen} = useContext(ContextTasks);

    return(
        <footer className="task-footer">
            <button onClick={()=>{
                setTaskOpen(!taskOpen);
                setSelectedCell(!selectedCell);
            }}><i className="fa-solid fa-arrow-right"></i></button>
        </footer>
    )
}