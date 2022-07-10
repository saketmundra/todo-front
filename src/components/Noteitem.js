import React,{useContext,useState} from 'react'
import NoteContext from '../context/notes/NoteContext'

const Noteitem = (props) => {
    const context = useContext(NoteContext)
    const {deleteNote } = context;
    const { note,updateNote } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-2">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <button type="button" className="btn btn-dark mx-1"onClick={()=>{updateNote(note)}}>Edit</button>
                    <button type="button" className="btn btn-dark mx-1" onClick={()=>{deleteNote(note._id);props.showAlert("Note Deleted","success")}}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Noteitem