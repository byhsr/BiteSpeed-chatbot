import { createContext, useEffect, useRef } from "react"
import SideBar from "./Components/ui/SideBar"
import { Style } from "./utils/ClassMerge"
import { useSelector } from "react-redux"
import type { RootState } from "./rdk/Store"
import ChatbotCanvas from "./Components/ui/ChatbotCanvas"
import Header from "./Components/ui/Header"
import SettingsPanel from "./Components/ui/SettingsPanel/SettingsPanel"
import { AnimatePresence } from "motion/react"
import type { ReactFlowInstance } from "@xyflow/react"


type InstanceContextType = {
  reactInstance: React.RefObject<ReactFlowInstance | null>
}

export const InstanceContext = createContext<InstanceContextType | null>(null)

function App() {
  const reactInstance = useRef<ReactFlowInstance | null>(null)

  const { darkMode, collapseNodesPanel, SettingPan } = useSelector((state: RootState) => state.theme)

  useEffect(() => {
    const doc = document.documentElement
    if (darkMode) doc.classList.add("dark")
    else doc.classList.remove("dark")
  }, [darkMode])

  return (
    <InstanceContext.Provider value={{ reactInstance }}>
      <div className="h-screen w-full bg-white dark:bg-zinc-800 overflow-hidden ">

        <div className="h-[8%] w-full relative z-10">
          <Header />
        </div>

        <div className="h-[92%] w-full flex ">

          <div className={Style("h-full transition-[width flex items-center ease-in-out duration-75 ", collapseNodesPanel ? "w-[4%]" : "w-[10%]")}>
            <SideBar collapse={collapseNodesPanel} />
          </div>

          <div className="flex-grow h-full p-1 dark:bg-zinc-800 transition-width ">
            <ChatbotCanvas />
          </div>

          <AnimatePresence mode="wait">
            {SettingPan.isOpen && <SettingsPanel key="settings-panel" />}
          </AnimatePresence>



        </div>
      </div>

    </InstanceContext.Provider>
  )
}

export default App
