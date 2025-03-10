export default function Header({currentDate, HandleOnClickArrowRight, HandleOnClickArrowLeft, setCurrentDate, handleMenuVisible}){
    const anni = [];
    for (let i=1970; i<3000; i++){
        anni.push(i);
    }   

    return(
        <header>
            <div>
                <button onClick={handleMenuVisible}><i className="fa-solid fa-bars"></i></button>
                <select name="mese" id="mese" size={1} value={currentDate.getMonth()} onChange={(e)=>{
                    const newDate = new Date(currentDate);
                    newDate.setMonth(e.target.value);
                    setCurrentDate(newDate);
                }}>
                    <option value="0">Gennaio</option>
                    <option value="1">Febbraio</option>
                    <option value="2">Marzo</option>
                    <option value="3">Aprile</option>
                    <option value="4">Maggio</option>
                    <option value="5">Giugno</option>
                    <option value="6">Luglio</option>
                    <option value="7">Agosto</option>
                    <option value="8">Settembre</option>
                    <option value="9">Ottobre</option>
                    <option value="10">Novembre</option>
                    <option value="11">Dicembre</option>
                </select>
                <select name="anno" id="anno" size={1} value={currentDate.getFullYear()} onChange={(e)=>{
                    const newDate = new Date(currentDate);
                    newDate.setFullYear(e.target.value);
                    setCurrentDate(newDate);
                }}>
                    {anni.map((anno, annoIndex)=>{
                        return(
                        <option key={annoIndex}>{anno}</option>
                        )
                    })}
                </select>
            </div>
            <div className="frecce">
                <i className="fa-solid fa-arrow-left" onClick={HandleOnClickArrowLeft}></i>
                <button>{currentDate.getDate()}</button>
                <i className="fa-solid fa-arrow-right" onClick={HandleOnClickArrowRight}></i>
            </div>
                <ul>
                    <li>profilo</li>
                </ul>
        </header>
    )
}