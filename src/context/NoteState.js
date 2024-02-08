import React from "react";
import  Notecontext from "./notecontext";

const NoteState = (props)=>{
     const state = {
        "name" : "Amrit" ,
         "class" : "sb"
     }
    return (
        <Notecontext.Provider value = {state}>
            {props.children}
        </Notecontext.Provider>
    )
}
export default NoteState;