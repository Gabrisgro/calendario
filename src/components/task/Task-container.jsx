import { useContext } from "react"
import { ContextTasks } from "../context/ContextTasks"
import TaskCard from "./TaskCard";

export default function TaskContainer({FormattedDate}){

    const {mapValues, list, setList, setSingleTaskValue, setMapValues} = useContext(ContextTasks);

    //eliminare la chiave da una mappa
    function deleteKeyValue(indexToRemove){
        const arrayMap = mapValues[FormattedDate];
        arrayMap.splice(indexToRemove ,1);
        const newMap = new Map(Object.entries(mapValues));
        newMap.set(FormattedDate, arrayMap)
        setMapValues(Object.fromEntries(newMap));
    }

    //per eliminare task
    function handleDeleteTask(index){
        const newList = list.filter((task, taskIndex)=>{
          return taskIndex !== index;
        })  
        setList(newList);
        deleteKeyValue(index);
    }
    //per editare task
    function handleEditTask(index){
        const valueToBeEdited = list[index];
        setSingleTaskValue(valueToBeEdited);
        handleDeleteTask(index);
    }

    return(
        <div className="task-container">
            {FormattedDate in mapValues ? mapValues[FormattedDate].map((Task, taskIndex)=>{
                return(
                    <TaskCard key={taskIndex} index={taskIndex} handleDeleteTask={handleDeleteTask} handleEditTask={handleEditTask}><p>{Task}</p></TaskCard>
                )
            }) : [].map((Task, taskIndex)=>{
                return(
                    <TaskCard key={taskIndex} index={taskIndex} handleDeleteTask={handleDeleteTask} handleEditTask={handleEditTask}><p>{Task}</p></TaskCard>
                )
            })}
        </div>
    )
}