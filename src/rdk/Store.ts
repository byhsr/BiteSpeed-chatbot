import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from "./ThemeSlice"
import ReactFlowReducer from "./reactFlowSlice"

export const Store  = configureStore( {
    reducer : {
         theme : ThemeReducer,
         flow : ReactFlowReducer
    }
    
})


export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;