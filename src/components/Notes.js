import React, { useContext } from 'react'
import notecontext from '../context/notecontext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
const Notes = () => {
 const context = useContext(notecontext)
  const{notes ,addNote } = context;
  return (
    <>
    <AddNote/>
    <div className="row my-3">
      <h2>Your Note</h2>
      {notes.map((notes)=>{
       return <Noteitem key = {notes._id} note = {notes}/>
      })}
      </div>
      </>
  )
}

export default Notes