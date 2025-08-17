import { createSlice } from "@reduxjs/toolkit";

type ThemeStateType = {
    darkMode : boolean,
    collapseNodesPanel :  boolean ,
    SettingPan : {
        isOpen : boolean,
        id? : string
    }

}

const initialState : ThemeStateType = {
    darkMode : true,
    collapseNodesPanel : false,
    SettingPan : {
        isOpen : false,
        id:""
    }
}


const ThemeSlice = createSlice({
    name : "theme",
    initialState,
    reducers: {
       toggleDarkMode : (state) => {
           state.darkMode = !state.darkMode
       },
       toggleNodesPan : (state , action) => {
        state.collapseNodesPanel = action.payload
       } ,
       
       initSetPan : (state , action) => {
        const {  isOpen , id } = action.payload   // tgus function is for initialization 
        state.SettingPan.isOpen = isOpen
        state.SettingPan.id = id
       },
       toggleSetPan : (state , action ) => { // this is just to toggle the visibility
        const {isOpen} = action.payload
        state.SettingPan = { ...state.SettingPan , isOpen}
       }
    }
       
})


export const {toggleDarkMode , toggleNodesPan ,initSetPan , toggleSetPan} = ThemeSlice.actions
export default ThemeSlice.reducer