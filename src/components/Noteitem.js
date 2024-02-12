import React  ,{useContext}from 'react'
import notecontext from '../context/notecontext';
const Noteitem = (props) => {
    const context = useContext(notecontext)
    const{deleteNote} = context;
    const { note , updateNote } = props
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully" ,"success")}}></i>
                        <i className ="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note) }}></i>
                    </div>
            </div>
        </div>
    )
}
                

export default Noteitem