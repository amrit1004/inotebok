import React from "react";
import  Notecontext from "./notecontext";
import { useState } from "react";

const NoteState = (props)=>{
     const notesInitial = [
        {
          "_id": "65c4d422ee1dca8cd88f453e7",
          "user": "65c37ad4525fe9dfc68dffa8",
          "title": "Hello everyone 2",
          "description": "this is a title description",
          "tag": "personal",
          "date": "1707398178449",
          "__v": 0
        },
        {
          "_id": "65c4d427ee1d4a8cd88f453e9",
          "user": "65c37ad4525fe9dfc68dffa8",
          "title": "Hello everyone 3",
          "description": "this is a title description",
          "tag": "personal",
          "date": "1707398183732",
          "__v": 0
        },
        {
          "_id": "65c4d422ee1ca38cd88f453e7",
          "user": "65c37ad4525fe9dfc68dffa8",
          "title": "Hello everyone 2",
          "description": "this is a title description",
          "tag": "personal",
          "date": "1707398178449",
          "__v": 0
        },
        {
          "_id": "65c4d422ee1c5a8cd88f453e7",
          "user": "65c37ad4525fe9dfc68dffa8",
          "title": "Hello everyone 2",
          "description": "this is a title description",
          "tag": "personal",
          "date": "1707398178449",
          "__v": 0
        },
        {
          "_id": "65c4d422ee1ca89cd88f453e7",
          "user": "65c37ad4525fe9dfc68dffa8",
          "title": "Hello everyone 2",
          "description": "this is a title description",
          "tag": "personal",
          "date": "1707398178449",
          "__v": 0
        },
        {
          "_id": "65c4d422ee1ca8c0d88f453e7",
          "user": "65c37ad4525fe9dfc68dffa8",
          "title": "Hello everyone 2",
          "description": "this is a title description",
          "tag": "personal",
          "date": "1707398178449",
          "__v": 0
        }
      ]
     const [notes, setNotes] = useState(notesInitial)
     //TODO api call
     const addNote =(title, description , tag)=>{
     const  note = {
        "_id": "65c4d422ee1ca8c0d88f453e7",
        "user": "65c37ad4525fe9dfc68dffa8",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "1707398178449",
        "__v": 0
      };
      setNotes(notes.concat(note));
     }
    return (
        <Notecontext.Provider value ={{addNote ,notes , setNotes}}>
            {props.children}
        </Notecontext.Provider>
    )}

export default NoteState;