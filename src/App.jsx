import {useContext} from "react"
import Board from "./components/boards/Board"
import Header from "./components/header/Header";
import Task from "./components/task/Task";
import Menu from "./components/menu/menu";
import Navbar from "./components/navbar/navbar";
import BoardDay from "./components/boards/BoardDay";
import { ContextVisible } from "./components/context/ContextVisible";

function App() {

  const {visibileDay} = useContext(ContextVisible);

  return (
    <>
        <div className="header-main-container">
            <Header />
            <main>
              <Menu />
              {visibileDay ? (<BoardDay/>) : (<Board />)}              
              <Navbar />
            </main>
        </div>
        <Task/>
    </>
  )
}

export default App
