import React, { useContext } from 'react'
import notecontext from '../context/notecontext';
import Noteitem from './Noteitem';
const Notes = () => {
 const context = useContext(notecontext)
  const{notes , setNotes } = context;
  return (
    <div className="row my-3">
      <h2>Your Note</h2>
      {notes.map((notes)=>{
       return <Noteitem note = {notes}/>
      })}
      </div>
  )
}

export default Notes