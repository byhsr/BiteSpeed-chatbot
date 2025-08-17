import type { AppDispatch, RootState } from "@/rdk/Store"
import { useDispatch, useSelector } from "react-redux"
import { createSelector } from "@reduxjs/toolkit";
import {updateContet } from "../../../rdk/reactFlowSlice";
import Icon from "../../../assets/Icon";
import { toggleSetPan } from "../../../rdk/ThemeSlice";
import { motion } from "motion/react"
import { useEffect, useState } from "react";
import NodeLabel from "../../Nodes/BaseNode/NodeLabel";
import Apperance from "./Apperance";



const SettingsPanel = () => {

    const selectSelectedNode = createSelector(
        (state: RootState) => state.flow.nodeEntities,
        (state: RootState) => state.theme.SettingPan.id,
        (nodeEntities, id) => {
            if (!id || !nodeEntities[id]) return null;
            return { id, ...nodeEntities[id] }
        }
    );

    const selectedNode = useSelector(selectSelectedNode)
    const dispatch: AppDispatch = useDispatch()

    if (!selectedNode) return null


    const [text, setText] = useState(selectedNode.content)

    useEffect(() => {
        setText(selectedNode.content);
    }, [selectedNode.content]);

  
    const handleBlur = () => {
        dispatch(updateContet({ id: selectedNode.id, content: text }))
    }

    const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            dispatch(updateContet({ id: selectedNode.id, content: text }))
        }
    }


    return (

        <motion.div
            key="settings-panel"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.3 }}
            className="bg-zinc-50 dark:bg-zinc-900 w-[25%] relative h-full p-2 ">

            <div className="w-full h-full space-y-2 flex flex-col rounded-md">
                <div className="min-h-7 w-full flex gap-1 mb-2 ">
                    <div
                        onClick={() => dispatch(toggleSetPan(false))}
                        className="  rounded p-1 flex dark:text-zinc-50 active:scale-90 hover:-translate-y-0.5
                    hover:border-b-2 border-zinc-400  transition-all pt-2 ease-in-out duration-75 hover:bg-zinc-200 dark:hover:bg-zinc-800
                    ">
                        <Icon type="back" className="w-3 h-3" />
                    </div>
                    <div className="flex gap-1 flex-grow text-sm h-[90%] w-full font-lexend font-light  ">
                        {/* <span className=" font-mono
                         px-1 text-green-500/70 text-sm border rounded flex flex-inline items-start">Node: </span> */}
                        <div className="flex items-center w-full h-full">
                            <NodeLabel id={selectedNode.id} label={selectedNode.label}
                                anyClass="dark:bg-zinc-900 p-1 hover:bg-blue-100 dark:hover:bg-blue-100/20 dark:text-zinc-100 text-[12px] w-full h-full" />
                        </div>



                    </div>

                </div>

                {/* temporarily rendering content settings only for nodes of type "message" because other nodes as of now are just for demonstration  */}
                 
                {selectedNode.label === "message" &&
                <div className="flex-2 bg-zinc-100 dark:bg-zinc-800 w-full h-[50%] dark:text-zinc-200 rounded p-2">
                    <span className=" font-Nunito font-semibold
                           rounded text-sm flex flex-inline items-center bg-zinc-200 dark:bg-zinc-900 p-1 px-2"> Content</span>
                    <textarea
                        onKeyDown={handleEnter}
                        onBlur={handleBlur}
                        className="text-[12px]  font-extralight  dark:text-zinc-100 p-1 font-lexend outline-0 w-full h-[90%] placeholder:dark:text-zinc-100 
                        rounded resize-none dark:bg-zinc-800" placeholder="type here." value={text} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setText(e.target.value) }} />
                {/* data updates either at enter or onblur to keep redux calls minimal  */}
                </div> 
                
            }
                

                <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-[30%] dark:text-zinc-200 rounded  p-2">

                    <span className=" font-Nunito font-semibold
                           rounded text-sm flex flex-inline items-center bg-zinc-200 dark:bg-zinc-900 p-1 px-2"> Appearance </span>
                         <Apperance selectedNode = { selectedNode} />
               
                </div>


            </div>


        </motion.div >

    )
}

export default SettingsPanel
