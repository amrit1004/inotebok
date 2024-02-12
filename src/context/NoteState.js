import React from "react";
import Notecontext from "./notecontext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const getNote = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token" :localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json)
  };
  //TODO api call
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note= await response.json();

    console.log(note)
    setNotes(notes.concat(note));
  };
  const deleteNote = async(id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token"),
      },
     
    });
    const json = await response.json();
   console.log(json)
    //console.log("deleting note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token" :localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json)
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if(element._id === id){
      newNotes[index].title = title;
      newNotes[index].description = description;
      newNotes[index].tag = tag;
    }
    break;
  }
  setNotes(newNotes);
  };
  return (
    <Notecontext.Provider
      value={{ addNote, editNote, deleteNote, notes, setNotes , getNote }}
    >
      {props.children}
    </Notecontext.Provider>
  );
};

export default NoteState;
