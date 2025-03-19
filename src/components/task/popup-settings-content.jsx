export default function PopupContent({handleDeleteAllTasksForDay}){
    return(
        <ul>
            <li>
                <p>Delete All</p>
                <div onClick={handleDeleteAllTasksForDay}>
                    <i className="fa-solid fa-trash"></i>
                </div>
            </li>
        </ul>
    )
}