
import Icon from "../../assets/Icon"
import { Style } from "../../utils/ClassMerge"
import { useSelector } from "react-redux"
import type { RootState } from "@/rdk/Store"


type propsType = {
    label : string
}


const DragAbleNode = ({label} : propsType )  => {

  const type = label.toLowerCase().trim()
  const { collapseNodesPanel} = useSelector((state: RootState) => state.theme)
 

  const handleDragStart = (e :React.DragEvent<HTMLDivElement>) => {

      e.dataTransfer.setData("reactflow/node" , JSON.stringify({ type : type })) // first is key - second is value
      e.dataTransfer.effectAllowed = "move"; 
  }

  return (


    <div
    draggable
    onDragStart={handleDragStart}
    className={Style( collapseNodesPanel && "justify-center"  , "w-full h-[30px] px-2 flex items-center space-x-1  ring-amber-50 rounded-xl hover:border-b-2 border-zinc-400  transition-all ease-in-out duration-75 hover:bg-zinc-200 dark:hover:bg-zinc-800")}

    >
      <Icon type={type} className={Style(" w-4 h-4 inline-flex items-start text-zinc-600 dark:text-green-200" , !collapseNodesPanel && "shrink-0" )} />
      {
        !collapseNodesPanel && <span className={Style("text-sm dark:text-zinc-100 text-zinc-800 font-lexend font-light")}>{label}</span>
      }

      
      
    </div>
  )
}

export default DragAbleNode
