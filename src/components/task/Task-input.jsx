import { useContext, useState, useRef, useEffect } from "react";
import { ContextTasks } from "../context/ContextTasks";
import PopupContent from "./popup-settings-content";

export default function TaskInput({handleAddClick, FormattedDate}){

    const {setSingleTaskValue, singleTaskValue, setMapValues, mapValues} = useContext(ContextTasks);
    const [popupSettingVisible, setPopupSettingVisible] = useState(false);
    const popupRef = useRef(null);

    //apre e chiude il popup
    function handlePopupSettingsOnClick(){
        setPopupSettingVisible(!popupSettingVisible);
    }

    //fa in modo che se clicco fuori dal popup questo si chiuda
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (popupRef.current && !popupRef.current.contains(event.target)) {
            setPopupSettingVisible(false);
          }
        };
    
        if (popupSettingVisible) {
          document.addEventListener('mousedown', handleClickOutside);
        } else {
          document.removeEventListener('mousedown', handleClickOutside);
        }
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [popupSettingVisible]);

    //elimina tutte le tasks di quel giorno
    function handleDeleteAllTasksForDay(){
        const {[FormattedDate]: _, ...newMapValues} = mapValues;
        setMapValues(newMapValues);
        setPopupSettingVisible(false);
    }

    return(
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
                <button onClick={handlePopupSettingsOnClick}>
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
                <div className={`popup-container-setting-task ${popupSettingVisible ? 'popup-container-visible': ''}`} ref={popupRef}>
                    <PopupContent handleDeleteAllTasksForDay={handleDeleteAllTasksForDay}/>
                </div>
        </div>
    );
}