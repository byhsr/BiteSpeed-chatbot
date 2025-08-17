import { createSlice } from "@reduxjs/toolkit";
import { type Edge, type Node } from "@xyflow/react";

// this is what node looks like
// data : { nodeId }
// id :"1755256891619"
// position :{ x: 120.19518072881374, y: 137.0807763794972 }
// type : "message"

//created a sperated nodeEntities to keep nodes lightweight and separate business logic since user may want to update content frequently so made it of type  object for faster lookups

interface NodeEntities {
    label: string;
    color: string;
    content?: string | number
    
    
}

interface FlowState {
    nodes: Node[];
    edges: Edge[];
    nodeEntities: Record<string, NodeEntities>
}

const initialState: FlowState = {
    nodes: [],
    edges: [],
    nodeEntities: {}
}


const FlowSlice = createSlice({
    name: "reactflow",
    initialState,
    reducers: {
        addNode: (state, action) => {
            const node = action.payload;
            state.nodes.push(node)
         
        },
        updateNodePosition: (state, action) => {
            const { id, position } = action.payload
            const node = state.nodes.find(n => n.id === id)
            if (node) node.position = position
        },
        updateLabel: (state, action) => {
            const { id, nodeLabel } = action.payload
            const node = state.nodeEntities[id]
            if (node) node.label = nodeLabel
        },
        setNodeEntities : (state, action) => {
            const { id , entDat }= action.payload
            
           state.nodeEntities[id] = entDat
        },
        updateColor : (state , action) => {
            const {id , newColor} = action.payload
            if(state.nodeEntities[id]){
            state.nodeEntities[id] = { ...state.nodeEntities[id] , color: newColor}
            }
        },
        updateContet : (state,action) => {
          const { id , content} = action.payload
          if(state.nodeEntities[id]){
            state.nodeEntities[id]= {...state.nodeEntities[id] , content}
          }
        },
        updateEdges : (state, action) => {
           state.edges.push(action.payload)
        }

    }
})
export const { addNode, updateLabel, updateNodePosition , setNodeEntities, updateColor, updateContet , updateEdges } = FlowSlice.actions
export default FlowSlice.reducer;