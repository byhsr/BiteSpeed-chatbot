import { useSelector } from "react-redux";
import BaseNode, { NodeBody } from "../BaseNode/BaseNode"
import type { NodeProps } from "@xyflow/react";
import type { RootState } from "@/rdk/Store"



const MessageNode = ({ id }: NodeProps) => {
  
 // tried making it super simple and scaleable to make new node just add basenode which handle all the data processing passing data to the settings panel applying styles etc 
 // Node Body to add content just pass hasSource or hasTarget to add body with an edge hanlde or pass both if it needs both handles 
 // can create multiple bodies 

  const {nodeEntities} = useSelector((state:RootState) => state.flow)
  const {label , content , color} = nodeEntities[id]

  return (

    <BaseNode label={ label || "Add message"} id={id} color={color}>
       <NodeBody hasSource>
         <div className="w-full min-h-full text-zinc-700 dark:text-zinc-200 text-[9px] whitespace-pre-wrap break-words p-1 font-lexend font-light">
        {content || "lets add something...."}
       
      </div>
      </NodeBody>
   

 
    </BaseNode>
  
  );
};

export default MessageNode;
