import React ,{useContext,useState}from 'react'
import NoteContext from '../context/notes/NoteContext'

const Addnote = (props) => {
    const context = useContext(NoteContext)
    const {addNote } = context;

    const [note, setNote] = useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
        setNote({title:"",description:"",tag:""})
        props.showAlert("Note Added","success")
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <h1>Add a Todo</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" placeholder='Min 5 Characters' value={note.title} name="title"  onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="description" placeholder='Min 10 Characters' value={note.description} name="description"  onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Tag</label>
                    <input type="text" className="form-control" id="tag" value={note.tag} name="tag" placeholder="private/home" onChange={onChange} />
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add To-do</button>
            </form>
        </div>
    )
}

export default Addnote