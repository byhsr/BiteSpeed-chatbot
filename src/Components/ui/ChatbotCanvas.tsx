import { useCallback, useContext, useRef, useState } from "react"
import type { OnNodesChange, Node, Edge, Connection } from '@xyflow/react'
import { Background, ReactFlow, addEdge, applyNodeChanges } from "@xyflow/react"
import { customNodeTypes } from "../Nodes/NodeTypes"
import { useDispatch, useSelector } from "react-redux";
import { addNode, setNodeEntities, updateEdges, updateNodePosition, } from "../../rdk/reactFlowSlice";
import type { AppDispatch } from "../../rdk/Store";

import type { RootState } from "../../rdk/Store";
import '@xyflow/react/dist/style.css'
import { InstanceContext } from "../../App";


const proOptions = { hideAttribution: true };

const color: Record<string, string> = {
    message: "#DBEAFE",
    condition: "#C9E4E7",
    output: "#FFB17A",
};
const ChatbotCanvas = () => {

    const nodesFromStore = useSelector((state: RootState) => state.flow.nodes);
    const edgesFromStore = useSelector((state: RootState) => state.flow.edges);

    const cntxt = useContext(InstanceContext)
    if (!cntxt) return null
    const { reactInstance } = cntxt

    const reactFlowWrapper = useRef<HTMLDivElement | null>(null)
    const [nodes, setNodes] = useState<Node[]>(nodesFromStore);
    const [edges, setEdges] = useState<Edge[]>(edgesFromStore);
    const dispatch: AppDispatch = useDispatch()


    const handleDropOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }


    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const getData = JSON.parse(e.dataTransfer.getData('reactflow/node'))
        if (!reactFlowWrapper.current) return
        const bounds = reactFlowWrapper.current.getBoundingClientRect()

        if (!reactInstance.current) return;
        const position = reactInstance.current.screenToFlowPosition({
            x: e.clientX - bounds.left,
            y: e.clientY - bounds.top,
        });
        const id = Date.now().toString()
        const type = getData.type
        const nodeData = {
            id,
            type,  // this type is necessary to macth with nodetype keys 
            position,
            data: { nodeEntId: id }
        }
        const nodeColor = color[type] ?? "#64748B"
        const entDat = { label: type, color: nodeColor, content: "" }
        setNodes(p => [...p, nodeData])
        dispatch(addNode(nodeData))
        dispatch(setNodeEntities({ id, entDat }))

    }, [reactInstance])

    const handleNodeChange: OnNodesChange = (changes) => {
        setNodes(nodes => applyNodeChanges(changes, nodes))
    }

    const handleConnect = useCallback((connection: Connection) => {
        setEdges((edges) => addEdge(connection, edges));
        dispatch(updateEdges(connection))
    }, [setEdges]);

    return (
        <div
            ref={reactFlowWrapper}
            className="w-full h-full  dark:bg-zinc-800 rounded"

        >

            <ReactFlow

                nodes={nodes}
                edges={edges}
                nodeTypes={customNodeTypes}
                onInit={(instance) => reactInstance.current = instance}
                onDrop={handleDrop}
                onDragOver={handleDropOver}
                proOptions={proOptions}
                onNodesChange={handleNodeChange}
                onConnect={(connection) => handleConnect(connection)}
                onNodeDragStop={(_, nd) => (dispatch(updateNodePosition({ id: nd.id, position: nd.position })))}
            >

                <Background />
            </ReactFlow>
        </div>
    )
}

export default ChatbotCanvas
