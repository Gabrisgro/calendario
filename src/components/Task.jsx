import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";

export default function Task({currentDate, daySelected, taskOpen, setTaskOpen, handleAddClick, setSingleTaskValue, singleTaskValue, handleDeleteTask, handleEditTask, setSelectedCell, selectedCell, mapValues, setMapValues, FormattedDate}){
    const mesi=['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];

    const nomeMese = mesi[currentDate.getMonth()];
    const [popupSettingVisible, setPopupSettingVisible] = useState(false);
    const listPopupSetting = ['delete all'];
    const listImagePopupSetting = [<i className="fa-solid fa-trash"></i>];
   // const listHandlePopupSetting =[];

    function handlePopupSettingsOnClick(){
        setPopupSettingVisible(!popupSettingVisible);
    }

    /*function handleDeleteAllTasksForDay(){
        const newMap = new Map(Object.entries(mapValues));
        delete newMap.FormattedDate;
        setMapValues(Object.fromEntries(newMap));
    }*/  


    return (
        <div className="sidebar">
            <h1>{`${daySelected} ${nomeMese}`}</h1>
            <div className="input-container">
                <input type="text" placeholder="write your task..."  value={singleTaskValue} onChange={(e)=>{
                    setSingleTaskValue(e.target.value)
                }} onKeyDown={(e)=>{
                    if (e.key === 'Enter'){
                        handleAddClick(singleTaskValue);
                        setSingleTaskValue('');
                    }
                }}/>

                <button onClick={()=>{
                    handleAddClick(singleTaskValue);
                    setSingleTaskValue('');
                }}><i className="fa-solid fa-plus"></i></button>
                <button style={{marginLeft: '5px'}} onClick={handlePopupSettingsOnClick}><i className="fa-solid fa-ellipsis-vertical"></i></button>
                <div className={`popup-container-setting-task ${popupSettingVisible ? 'popup-container-visible': ''}`}>
                    <ul>
                        {listPopupSetting.map((item, itemIndex)=>{
                            return(
                                <li key={itemIndex}>
                                    <p>{item}</p>
                                    <div>
                                        {listImagePopupSetting[itemIndex]}
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
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
            <footer>
                <button onClick={()=>{
                    setTaskOpen(!taskOpen);
                    setSelectedCell(!selectedCell);
                }}><i className="fa-solid fa-arrow-right"></i></button>
            </footer>
        </div>
    )
}