import BaseNode, { NodeBody } from '../BaseNode/BaseNode'
import type { NodeProps } from '@xyflow/react'
import { useSelector } from "react-redux";
import type { RootState } from "@/rdk/Store"

const OutputNode = ({id} : NodeProps) => {
       const {nodeEntities} = useSelector((state:RootState) => state.flow)
      const {label , color} = nodeEntities[id]
  return (
    <BaseNode label={label} color={color} id={id} >
          <NodeBody hasTarget>
                 <div className='w-20 h-20'>

                 </div>
          </NodeBody>
     </BaseNode>
  )
}

export default OutputNode
