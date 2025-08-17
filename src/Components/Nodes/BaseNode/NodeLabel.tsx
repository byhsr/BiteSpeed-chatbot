
import { useEffect, useState } from "react"
import type { AppDispatch } from "../../../rdk/Store"
import { useDispatch, useSelector } from "react-redux"
import { updateLabel } from "../../../rdk/reactFlowSlice"
import { Style } from "../../../utils/ClassMerge"
import type { RootState } from "../../../rdk/Store"


const NodeLabel = ({  label , id, anyClass } : {label : string , id :string , anyClass?:string}) => {
   const [nodeLabel , setNodeLabel] = useState<string>(label)
    const [dblClicked, setDblClicked] = useState(false)
    const dispatch : AppDispatch = useDispatch()

    const {nodeEntities} = useSelector((state:RootState) => state.flow)

    useEffect(()=>{
        if(nodeEntities[id]){
           setNodeLabel(nodeEntities[id].label)
        }
        
    }, [nodeEntities[id].label])

    const handleEnter = (e :React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            if (e.currentTarget.value === "") {
                setNodeLabel(label)
                dispatch(updateLabel({ id , label}))
            }
            dispatch(updateLabel({ id , nodeLabel}))
            setDblClicked(false)
        }
    }
  const handleBlur = (e:React.FocusEvent<HTMLTextAreaElement>) => {

    if (e.currentTarget.value === "") {
                setNodeLabel(label)
                dispatch(updateLabel({ id , label}))
            }
    setDblClicked(false)
    dispatch(updateLabel({ id , nodeLabel}))
  }

    return (
        <div
            className={Style('font-lexend text-zinc-600 w-full text-[10px] font-light hover:backdrop-blur-2xl  rounded hover:bg-white/30' , anyClass)}
            onDoubleClick={() => setDblClicked(true)}
            
        >
            {
                dblClicked ?
                    < textarea 
                    className="outline-none  backdrop-blur-2xl resize-none px-1 h-5 w-full rounded-md overflow-hidden " 
                  value={nodeLabel} onChange={(e)=>(setNodeLabel(e.target.value))} onBlur={handleBlur} onKeyDown={handleEnter} name="nodeLabel" />

                    : <div
                    className="overflow-hidden text-clip text-start px-1 self-start break-words "
                        
                    >{nodeLabel}</div>
            }

        </div >
    )
}

export default NodeLabel