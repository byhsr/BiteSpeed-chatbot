
import { Style } from "../../utils/ClassMerge";

import DragAbleNode from "../Nodes/DragAbleNode";
import Icon from "../../assets/Icon";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "@/rdk/Store";
import { toggleNodesPan } from "../../rdk/ThemeSlice";
import { useContext } from "react";
import { InstanceContext } from "../../App";



const SideBar = ({collapse} : {collapse : boolean}) => {

  const cntxt = useContext(InstanceContext)
  if(!cntxt) return null 
  const {reactInstance} = cntxt

  const dispatch:AppDispatch = useDispatch()

    return (

        <div className={Style("w-full h-[90%] rounded-r-2xl p-1 relative bg-zinc-100 dark:bg-zinc-900" )}>

            <div className=" relative h-8 w-full flex justify-end px-2 ">
                 <div
                    
                    className=" h-4 w-4 text-black dark:text-amber-50 dark:hover:bg-zinc-700 hover:bg-zinc-200 rounded ">
                    {collapse ? <Icon type="Rightcollapse" onClick={() => dispatch(toggleNodesPan(false))}/> : <Icon type="leftCollapse" onClick={() => dispatch(toggleNodesPan(true))}/>}
                </div>

            </div>


            <div className="w-full h-[90%] p-1 space-y-0.5 rounded">
                <div className="w-full h-[70%]">
                       <DragAbleNode label="Message" />
                       <DragAbleNode label="Condition" />
                       <DragAbleNode label="Output" />
                </div>
               
                <div className="h-[30%] w-full flex flex-col text-zinc-700 dark:text-green-200 py-2 rounded  px-1 gap-1 items-center justify-end">
                    <button 
                    className="  w-full rounded text-[14px]
                    hover:border-b-2 border-zinc-400  transition-all ease-in-out duration-75 justify-center flex gap-2 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                    onClick={()=>reactInstance.current?.zoomIn()}>+
                    </button>   
                    <button 
                    className="  w-full rounded
                    hover:border-b-2 border-zinc-400  transition-all ease-in-out duration-75 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                    onClick={()=>reactInstance.current?.zoomOut()}>-</button>
                    
                    <button 
                    className="  w-full rounded text-[10px] py-1 
                    hover:border-b-2 border-zinc-400  transition-all ease-in-out duration-75 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                    onClick={()=>reactInstance.current?.fitView()}>fit</button>
                </div>
            </div>
        </div>
    )
}

export default SideBar
