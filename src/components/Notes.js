import React, { useContext, useEffect, useRef,useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import Noteitem from './Noteitem'
import Addnote from './Addnote'
import { useNavigate } from "react-router-dom";


const Notes = (props) => {
  let navigate = useNavigate();
  const context = useContext(NoteContext)
  const { notes, getNote ,editNote} = context

  const [note, setNote] = useState({id:"",  etitle: "", edescription: "", etag: "default" })

  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate("/login")
    }
    else {
      getNote()
    }
    
  }, [])
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  }
  const ref = useRef(null)
  const refClose = useRef(null)

  const handleClick = (e) => {
    console.log("Updating the note",note);
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();
    props.showAlert("Note Updated","success")
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <div className='container'>
      <Addnote showAlert={props.showAlert} />
      <button type="button" ref={ref} className="btn btn-primary d-none " data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit To-Do</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle}  onChange={onChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription}  onChange={onChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag}  onChange={onChange} />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button  disabled={note.etitle.length<5 || note.edescription.length<5}type="button" className="btn btn-primary" onClick={handleClick}>Save</button>
            </div>
          </div>
        </div>
      </div>

      <h1>Your To-do</h1>
      <div className='row'>
        {notes.map((note) => {
          return <Noteitem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
        })}</div>
    </div>
  )
}

export default Notes