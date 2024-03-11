import { createContext, useState } from "react";

export const Context = createContext()

export const ContextProvider = ({children}) =>{
    const [x,setx] = useState([])
    const [y,sety] = useState([])
    const [activity,setactivity] = useState([])
    const [ActivityTranspose,setActivityTranspose] = useState([])
    const [SinOfActivityTranspose,setSinOfActivityTranspose] = useState([])
    const [PhaseCoherenceValues,setPhaseCoherenceValues] = useState([])
    const [xlim,setxlim] = useState([])
    const [time, setTime] = useState(0);
    const [type,settype] = useState(null);
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
        setxlim
    }
    return (
        <Context.Provider value={ContextData}>
            {children}
        </Context.Provider>
    )
}