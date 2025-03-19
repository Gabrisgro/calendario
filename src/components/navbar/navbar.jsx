import { useContext } from "react";
import { ContextTasks } from "../context/ContextTasks";

export default function Navbar(){

    const {taskOpen, setTaskOpen} = useContext(ContextTasks);

    return(
        <nav>
            <i className="fa-solid fa-list-check" onClick={()=> {
                setTaskOpen(!taskOpen);
            }}></i>
        </nav>
    )
}