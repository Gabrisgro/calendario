function Board({renderCalendar}){
    return(
            <table>
                <thead>
                    <tr>
                        <th>Dom</th>
                        <th>Lun</th>
                        <th>Mar</th>
                        <th>Mer</th>
                        <th>Giov</th>
                        <th>Ven</th>
                        <th>Sab</th> 
                    </tr>
                </thead>
                <tbody>
                    {renderCalendar()}
                </tbody>
            </table>
    )
}

export default Board;