import { createContext, useState } from "react";
import { useRef } from "react";

const appContext = createContext()

function Context ({ children }) {

    const [inputValue, setInputValue] = useState()
    const search = useRef(null)
    const [empiti, setEmpiti] = useState(false)
    const [change, setChange] = useState(false)
    const [summaryId, setSummaryId] = useState('');

    return(
        <appContext.Provider value={{
            search,
            inputValue,
            setInputValue,
            empiti,
            setEmpiti,
            change,
            setChange,
            summaryId,
            setSummaryId
        }}>
            {children}
        </appContext.Provider>
    )
}

export { Context, appContext }