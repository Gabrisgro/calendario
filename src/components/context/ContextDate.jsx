import React, { createContext, useState, useEffect } from 'react';

export const ContextDate = createContext();

export const ContextDateProvider = ({children}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [daySelected, setDaySelected] = useState(currentDate.getDate());
    const Today = new Date().getDate();
    const ThisMonth = new Date().getMonth();
    const ThisYear = new Date().getFullYear();

    return (
        <ContextDate.Provider value={{currentDate, setCurrentDate, daySelected, setDaySelected, Today, ThisMonth, ThisYear}}>
            {children}
        </ContextDate.Provider>
    );
};