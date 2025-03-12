import React, { useContext, useState } from 'react';
import ContextDate from './ContextDate';

export default function DateProvider({children}){
    const [currentDate, setCurrentDate] = useState(new Date());

    return(
        <DateProvider.Provider value={{currentDate, setCurrentDate}}>
            {children}
        </DateProvider.Provider>
    )
}