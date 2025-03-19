import { useContext } from "react";
import MenuOptionVisualization from "./Menu-Options-Visualization";
import './menu.css';
import { ContextVisible } from "../context/ContextVisible";

export default function Menu(){

    const {menuVisible} = useContext(ContextVisible);

    return(
        <div className={`menu ${menuVisible ? 'visible': ''}`}>
            <h1 className={menuVisible ? 'h1-visible' : 'menu-h1'}>Il tuo calendario</h1>
            <MenuOptionVisualization menuVisible={menuVisible}/>
        </div>
    )
} 