export default function Navbar({taskOpen, setTaskOpen}){
    return(
        <nav>
            <i className="fa-solid fa-list-check" onClick={()=> {
                setTaskOpen(!taskOpen);
            }}></i>
        </nav>
    )
}