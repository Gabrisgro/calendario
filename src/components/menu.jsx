export default function Menu({menuVisible}){
    return(
        <div className={`menu ${menuVisible ? 'visible': ''}`}>
            <h1>Il tuo calendario</h1>
            <div className="options-of-visualization-container">
                <ul>
                    <li>
                        <i className="fa-solid fa-list-check"></i>
                        <p>All Tasks</p>
                    </li>
                    <li>
                        <i className="fa-solid fa-calendar-day"></i>
                        <p>Day</p>
                    </li>
                    <li>
                        <i className="fa-solid fa-calendar-week"></i>
                        <p>Week</p>
                    </li>
                    <li>
                        <i className="fa-solid fa-calendar"></i>
                        <p>Month</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}