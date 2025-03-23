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

    const arrayMove = (array, fromIndex, toIndex) => {
        const newArray = [...array]; // Crea una copia dell'array
        const [movedItem] = newArray.splice(fromIndex, 1); // Rimuove l'elemento da fromIndex
        newArray.splice(toIndex, 0, movedItem); // Inserisce l'elemento in toIndex
        return newArray;
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        // Verifica se l'elemento di destinazione esiste
        if (!over) return;

        // Verifica se la chiave esiste in mapValues
        if (!mapValues[FormattedDate]) return;

        // Trova l'array di task per la chiave formattedData
        const tasks = mapValues[FormattedDate];

        // Trova gli indici delle task trascinate e di destinazione
        const oldIndex = active.id;
        const newIndex = over.id;

        // Se gli indici sono validi e diversi, riordina l'array
        if (oldIndex !== newIndex && oldIndex !== -1 && newIndex !== -1) {
            const newTasks = arrayMove(tasks, oldIndex, newIndex);

            // Aggiorna mapValues con il nuovo array di task
            setMapValues((prevMapValues) => ({
                ...prevMapValues,
                [FormattedDate]: newTasks, // Sostituisce l'array di task per la chiave formattedData
            }));
        }
    };

    return(
        <div className="board-right-container">
            <h1>Task del {`${daySelected} ${nomeMese} ${currentDate.getFullYear()}`} </h1>
                {mapValues[FormattedDate] ? 
                    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                        <div>
                        <SortableContext items={mapValues[FormattedDate].map((task, index)=>{
                            return(
                                index
                            )
                        } )} 
                        strategy={verticalListSortingStrategy}>
                            {mapValues[FormattedDate].map((task, taskIndex)=>{

                                return(
                                    <TaskBoardDay task={task} key={taskIndex} id={taskIndex}/>
                                )
                            })}
                        </SortableContext> 
                        </div>
                    </DndContext>
                    : ''}
        </div>
    )
}