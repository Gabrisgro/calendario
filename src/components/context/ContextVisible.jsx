import React, { Children, createContext, useState } from 'react';

export const ContextVisible = createContext();

export const ContextVisibleProvider = ({children})=>{
    const [menuVisible, setMenuVisible] = useState(false);
    const [visibileDay, setVisibleDay] = useState(false);

    function handleDAYorMonth(){
        setVisibleDay(!visibileDay);
    }

    return(
        <ContextVisible.Provider value={{menuVisible, setMenuVisible, visibileDay, setVisibleDay, handleDAYorMonth}}>
            {children}
        </ContextVisible.Provider>
    )
}