import React, { createContext, useState } from 'react';

export const ContextTasks = createContext();

export const ContextTasksProvider = ({children}) =>{
    const [list, setList] = useState([]); //lista task
    const [singleTaskValue, setSingleTaskValue] = useState('');
    const [taskOpen, setTaskOpen] = useState(false); //barra laterale delle task
    const [mapValues, setMapValues] = useState(new Map());
    const [selectedCell, setSelectedCell] = useState(false);

    return(
        <ContextTasks.Provider value={{list, setList, singleTaskValue, setSingleTaskValue, taskOpen, setTaskOpen, mapValues, setMapValues, selectedCell, setSelectedCell}}>
                    {children}
        </ContextTasks.Provider>
    );
};