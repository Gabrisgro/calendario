import { useContext } from "react"
import { ContextTasks } from "../context/ContextTasks"
import { ContextDate } from "../context/ContextDate";
import TaskBoardDay from "./taskBoardDay";
import { DndContext, closestCorners } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';


export default function BoardDayRight({FormattedDate}){

    const {currentDate, daySelected} = useContext(ContextDate);
    const {mapValues, setMapValues} = useContext(ContextTasks);

    const mesi=['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
    const nomeMese = mesi[currentDate.getMonth()];

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {

            const tasks = mapValues.FormattedDate;
            const oldIndex = tasks.findIndex(task => task.id === active.id);
            const newIndex = tasks.findIndex(task => task.id === over.id);
            const newTasks = [...tasks];
            newTasks.splice(oldIndex, 1);
            newTasks.splice(newIndex, 0, tasks[oldIndex]);

            setMapValues((prevState)=>({
                ...prevState, 
                [FormattedDate]: newTasks
            }));
        }
    };
    
    return(
        <div className="board-right-container">
            <h1>Task del {`${daySelected} ${nomeMese} ${currentDate.getFullYear()}`} </h1>
                <div>
                    {mapValues[FormattedDate] ? mapValues[FormattedDate].map((task, taskIndex)=>{
                        return(
                            <TaskBoardDay task={task} key={taskIndex}/>
                        )
                    }) : ''}
                </div>
        </div>
    )
}