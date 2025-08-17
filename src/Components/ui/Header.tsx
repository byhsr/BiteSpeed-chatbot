import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../rdk/Store";
import { toggleDarkMode } from "../../rdk/ThemeSlice";
import Icon from "../../assets/Icon";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
const Header = () => {

  const { darkMode } = useSelector((state: RootState) => state.theme)
  const [isConnected, setIsConnected] = useState<boolean | null>(null)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    if (isConnected === false) {
      const id = setTimeout(() => { setIsConnected(true) }, 2000)
      return () => clearInterval(id)
    }

  }, [isConnected])

  const { nodes: allNodes, edges: allEdges } = useSelector((state: RootState) => state.flow)

  const allNodesConnected = () => {
    return allNodes.every(node =>
      allEdges.some(edge => edge.source === node.id || edge.target === node.id)
    )
  }



  const handleSubmit = () => {
    const res = allNodesConnected()
    setIsConnected(res)
  }


  return (

    <div className=" h-full w-full bg-zinc-100 dark:bg-zinc-900 flex">
      <div className="w-[70%] ">

      </div>
      <div className="w-[30%] p-1 flex gap-3 justify-end">
        <button className="bg-blue-100 hover:bg-blue-200 hover:scale-95 transition-all ease-in-out duration-100 px-3 py-1 rounded text-sm" onClick={handleSubmit}>submit</button>
        <div
          onClick={() => dispatch(toggleDarkMode())}
          className=" h-4 w-4 text-black dark:text-amber-50 dark:hover:bg-zinc-700 hover:bg-zinc-200 rounded ">
          {darkMode ? <Icon type="LightMode" /> : <Icon type="DarkMode" />}
        </div>
      </div>
      <AnimatePresence>
        {isConnected === false &&
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            className="fixed flex items-center text-sm justify-center text-white left-1/3 bg-red-400 rounded-xl
               bottom-5 border-b-2 border-black bg-red w-50 h-10">
            All Nodes Must Be Connected
          </motion.div>
        }
      </AnimatePresence>



    </div>
  )
}

export default Header
