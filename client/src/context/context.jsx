import { createContext, useContext, useRef, useState } from "react"

const dataContext = createContext(null)


const DataContextProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') ? JSON.parse(localStorage.getItem('theme')) : true)

    const adminHeadRef = useRef()
    const sideBardHeadRef = useRef()
    const handleResSideBar = () => {
        sideBardHeadRef.current.classList.toggle('resSidebarInHead')
    }
    const handleAddWidthHeader = () => {
        adminHeadRef.current.classList.toggle('activeHeadBurger')
        sideBardHeadRef.current.classList.toggle('sideBar')
    }

    const values = {
        adminHeadRef,sideBardHeadRef,handleResSideBar,handleAddWidthHeader,theme,setTheme
    }
    return <dataContext.Provider value={values} >{children}</dataContext.Provider>
}

const useDataContext = () => useContext(dataContext)

export { DataContextProvider, useDataContext }