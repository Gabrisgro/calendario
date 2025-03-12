import React, { createContext, useState } from 'react';

const ContexDate = createContext({
    currentDate: new Date(),
    setCurrentDate:()=>{} , 
});

export default ContexDate;