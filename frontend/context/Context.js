import { createContext, useEffect, useState } from "react";
import { useRef } from "react";
import axios from "axios";
export const Context = createContext()

export const ContextProvider = ({ children }) => {
    const [x, setx] = useState([])
    const [y, sety] = useState([])
    const [activity, setactivity] = useState([])
    const [ActivityTranspose, setActivityTranspose] = useState([])
    const [SinOfActivityTranspose, setSinOfActivityTranspose] = useState([])
    const [PhaseCoherenceValues, setPhaseCoherenceValues] = useState([])
    const [xlim, setxlim] = useState([])
    const [time, setTime] = useState(null);
    const [type, settype] = useState(null);
    const [couplingVals,setcouplingVals] = useState([])
    const [rMean,setrMean] = useState([])
    
    const plotWorkerRef = useRef(null);
   
    
    const ContextData = {
        x,
        setx,
        y,
        sety,
        time,
        setTime,
        type,
        settype,
        activity,
        setactivity,
        ActivityTranspose,
        setActivityTranspose,
        SinOfActivityTranspose,
        setSinOfActivityTranspose,
        PhaseCoherenceValues,
        setPhaseCoherenceValues,
        xlim,
        setxlim,
        plotWorkerRef,
        couplingVals,setcouplingVals,
        rMean,setrMean
       
    }

    
    return (
        <Context.Provider value={ContextData}>
            {children}
        </Context.Provider>
    )
}