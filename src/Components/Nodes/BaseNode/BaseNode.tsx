import { motion,  } from "motion/react"
import NodeLabel from "./NodeLabel"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/rdk/Store"
import { initSetPan , toggleNodesPan} from "../../../rdk/ThemeSlice"
import { useEffect, useState } from "react"
import { Handle, Position } from "@xyflow/react"

type baseNodeProps = {
    label : string,
    id : string ,
    color? : string,
   children? : React.ReactNode
}

const BaseNode = ({label, children , id , color}:baseNodeProps) => {
  const[hide , setHide] = useState(false)
  const dispatch:AppDispatch=useDispatch()
  
  useEffect(()=>{
    dispatch(initSetPan({id , isOpen : true}))
    dispatch(toggleNodesPan({isOpen : false}))
  }, [hide])
  // node dropped in the canvas passes the id so setting pannel can fetch data from nodeEntities[id]
  // everynode dropped passes its id and data gets replaced 


  return <motion.div 
  initial={{y:-5}}
  animate={{y:0}}
  transition={{type : "spring"  , stiffness : 200}}
  className='rounded-xl w-40  border-b-2 border-zinc-600 dark:border-white  relative z-100 space-y-1'
  style={{backgroundColor : color}}
  onClick={()=>setHide(p => !p)}
  >
   <div className="dark:border p-2 rounded-xl">
    <div className="">
        <NodeLabel label={label} id={id} />
    </div>
    <div 
    
    className="bg-amber-50 dark:border-zinc-100 border-[1px] border-dashed dark:bg-zinc-800 dark:text-zinc-50 w-full rounded">
        {children}
    </div>
</div>
        
  </motion.div>
}

export default BaseNode




export const NodeBody = ({
  children, 
  hasSource = false,
  hasTarget = false
} : {
  children: React.ReactNode,
  hasSource?: boolean,
  hasTarget?: boolean
}) => {
  return (
    <div className="relative w-full h-full rounded">
      {hasTarget && (
        <Handle className="w-4 h-4" type="target"  position={Position.Left}  id="target"  />
      )}
      
      {hasSource && (
        <Handle 
          className="w-4 h-4" type="source" position={Position.Right}  id="source"  />
      )}
      
      {children}
    </div>
  );
};