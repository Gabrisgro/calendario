import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities";

export default function TaskBoardDay({task, id}){
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id});

    const style ={
        transition,
        transform: CSS.Transform.toString(transform),
    };

    return(
            <div className="task-board-right" ref={setNodeRef} {...attributes} {...listeners} style={style}>
                <p>{task}</p>
            </div>
    )
}