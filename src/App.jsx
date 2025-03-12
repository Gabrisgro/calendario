import { useState, useEffect} from "react"
import Board from "./components/Board"
import Header from "./components/Header";
import Task from "./components/Task";
import Menu from "./components/menu";
import Navbar from "./components/navbar";
//500px grandezza teniamo cosi
function App() {

  const [list, setList] = useState([]); //lista task
  const [singleTaskValue, setSingleTaskValue] = useState('');
  const [taskOpen, setTaskOpen] = useState(false); //barra laterale delle task
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daySelected, setDaySelected] = useState(currentDate.getDate());
  const Today = new Date().getDate();
  const ThisMonth = new Date().getMonth();
  const ThisYear = new Date().getFullYear();
  const [selectedCell, setSelectedCell] = useState(false);
  const [mapValues, setMapValues] = useState(new Map());
  const [thereAreTasks, setThereAreTasks] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  //provo context per la current Date
  //const {currentDate, setCurrentDate} = useContext(DateProvider);


  function getFormattedDate(date){
    return `${daySelected}-${date.getMonth()}-${date.getFullYear()}`;
  }

  let FormattedDate = getFormattedDate(currentDate);

  useEffect(()=>{
    FormattedDate = getFormattedDate(currentDate);
  }, [currentDate])
  
    const daysInMonth = (month, year) => {
      return new Date(year, month + 1, 0).getDate();
    };
  
    // Funzione per ottenere il giorno della settimana del primo giorno del mese
    const firstDayOfMonth = (month, year) => {
      return new Date(year, month, 1).getDay();
    };
  
    // Funzione per generare il calendario
  const renderCalendar = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const totalDays = daysInMonth(month, year);
    const firstDay = firstDayOfMonth(month, year);
  
    const weeks = [];
    let days = [];
  
    // Riempie i giorni vuoti prima del primo giorno del mese
    for (let i = 0; i < firstDay; i++) {
      days.push(<td key={`empty-${i}`}></td>);
    }
  
    // Riempie i giorni del mese
    for (let day = 1; day <= totalDays; day++) {
      const newFormattedDate = `${day}-${month}-${year}`;
  
      days.push(
        <td key={day} onClick={() => {
          setTaskOpen(!taskOpen);
          setDaySelected(day);
          setSelectedCell(!selectedCell);
        }} className={`${selectedCell && day === daySelected ? 'selected-cell' : ''} ${thereAreTasks ? 'there-are-tasks' : ''}`}>
          <p className={`number-day ${day === Today && month === ThisMonth && year === ThisYear ? 'this-day' : ''}`}>{day}</p>
          <div className="tasks-in-cell-container">
            {mapValues[newFormattedDate] ? mapValues[newFormattedDate].map((value, index) => (
              <p key={index} className="tasks-in-cell">
                {value}
              </p>
            )) : ''}
          </div>
        </td>
      );
  
      // Se abbiamo 7 giorni o siamo alla fine del mese, crea una nuova riga
      if (days.length === 7 || day === totalDays) {
        weeks.push(<tr key={day}>{days}</tr>);
        days = [];
      }
    }
  
    return weeks;
  };

  function HandleOnClickArrowRight(prevDate){//per andare a destra di un mese
    setCurrentDate((prevDate)=>{
      const nextDay = new Date(prevDate);
      nextDay.setMonth(prevDate.getMonth()+1);
      return nextDay;
    });
  };

  function HandleOnClickArrowLeft(p){ //per andare a sinistra di un mese
    setCurrentDate((prevDate)=>{
      const precDay = new Date(prevDate);
      precDay.setMonth(prevDate.getMonth()-1);
      return precDay;
    });
  };

  function handleAddClick(task){ //per aggiungere task
    const newList = [...list, task];
    setList(newList);
    addKeyValue(FormattedDate, task); 
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


  //aggiungo chiavi e valori alla mappa
  function addKeyValue(key, value){
    if (!(key in mapValues)){
        setMapValues(prevMap => ({
          ...prevMap, // Copia tutte le chiavi esistenti
          [key]: [value] // Aggiungi la nuova chiave con il valore associato
        }));
    }else{
        setMapValues(prevMap => ({
          ...prevMap, // Copia tutte le chiavi esistenti
          [key]: [...(prevMap[key] || []), value] // Aggiungi il nuovo valore alla chiave esistente
        }));
    }
  }

  function deleteKeyValue(indexToRemove){
    const arrayMap = mapValues[FormattedDate];
    arrayMap.splice(indexToRemove ,1);
    const newMap = new Map(Object.entries(mapValues));
    newMap.set(FormattedDate, arrayMap)
    setMapValues(Object.fromEntries(newMap));
  }

  //funzione per gestire l'uscita del menu
  function handleMenuVisible(){
    setMenuVisible(!menuVisible);
  }

console.log(mapValues)

  return (
    <>
      <div className="header-main-container">
        <Header currentDate={currentDate} HandleOnClickArrowRight={HandleOnClickArrowRight} HandleOnClickArrowLeft={HandleOnClickArrowLeft} setCurrentDate={setCurrentDate} handleMenuVisible={handleMenuVisible}/>
        <main>
          <Menu menuVisible={menuVisible}/>
          <Board renderCalendar={renderCalendar}/>
          <Navbar taskOpen={taskOpen} setTaskOpen={setTaskOpen}/>
        </main>
      </div>
      {taskOpen && (<Task currentDate={currentDate} daySelected={daySelected} taskOpen={taskOpen} setTaskOpen={setTaskOpen} handleAddClick={handleAddClick} setSingleTaskValue={setSingleTaskValue} singleTaskValue={singleTaskValue} handleDeleteTask={handleDeleteTask} handleEditTask={handleEditTask} setSelectedCell={setSelectedCell} selectedCell={selectedCell} mapValues={mapValues} FormattedDate={FormattedDate} setMapValues={setMapValues}/>)}
    </>
  )
}

export default App
