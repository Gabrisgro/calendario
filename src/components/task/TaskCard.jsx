import { useState } from "react";

export default function TaskCard({children, index, handleDeleteTask, handleEditTask}){

    const [checked, setChecked] = useState(false);

    return(
        <li className="task-card">
            <input type="checkbox" checked={checked} onChange={()=>{
                    setChecked(!checked);
                }}
                className="check"
                />
            <label htmlFor="myCheckbox">
                {children}  
            </label>
            <div className="task-button">
                <button onClick={()=>{handleEditTask(index)}}><i className="fa-solid fa-pen-to-square"></i></button>
                <button onClick={()=>{handleDeleteTask(index)}}><i className="fa-solid fa-trash"></i></button>
            </div>
        </li>
    )
}