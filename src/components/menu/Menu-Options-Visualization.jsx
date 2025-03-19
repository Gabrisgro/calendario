export default function MenuOptionVisualization({menuVisible}){
    return(
        <div className='options-of-visualization-container'>
            <ul className={menuVisible ? 'ul-visible': 'options-of-visualization-container-ul'} >
                <li className={menuVisible ? 'li-visible': 'options-of-visualization-container-li'} >
                    <i className="fa-solid fa-list-check"></i>
                    <p>All Tasks</p>
                </li>
                <li className={menuVisible ? 'li-visible': 'options-of-visualization-container-li'}>
                    <i className="fa-solid fa-calendar-day"></i>
                    <p>Day</p>
                </li>
                <li className={menuVisible ? 'li-visible': 'options-of-visualization-container-li'}>
                    <i className="fa-solid fa-calendar-week"></i>
                    <p>Week</p>
                </li>
                <li className={menuVisible ? 'li-visible': 'options-of-visualization-container-li'}>
                    <i className="fa-solid fa-calendar"></i>
                    <p>Month</p>
                </li>
            </ul>
        </div>
    )
}