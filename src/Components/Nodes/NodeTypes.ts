import type { NodeTypes } from "@xyflow/react"
import MessageNode from "./NodesOnDisplay/MessageNode"
import OutputNode from "./NodesOnDisplay/OutputNode"
import Condition from "./NodesOnDisplay/Condition"


export const customNodeTypes : NodeTypes = {
    message: MessageNode    ,
    output : OutputNode,
    condition : Condition
    

}





   // key should match with type passed into draggable node compo