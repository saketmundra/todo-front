import React, { useState } from "react";
import Notecontext from "./NoteContext";

const NoteState = (props) => {
  const host = "https://inotebook-backnd.herokuapp.com"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)


  //get all notes
  const getNote =async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      }
    });
    const json =await response.json();
    console.log(json);
    setNotes(json);
  }
  //add a note function
  const addNote =async (title, description, tag) => {

    const response = await fetch(`${host}/api/notes/addnote/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },
      body: JSON.stringify({title, description, tag})
    });
    const note= await response.json();
    setNotes(notes.concat(note))

  }



  //delete note
  const deleteNote = async(id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
     const json =response.json();
     console.log(json)

    const newNotes = notes.filter((note) => (note._id !== id))
    setNotes(newNotes);
  }


  //edit note
  const editNote = async (id, title, description, tag)=> {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });

    let newNotes=JSON.parse(JSON.stringify(notes))
    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setNotes(newNotes);

  }



  return (
    <Notecontext.Provider value={{ notes, addNote, deleteNote, editNote,getNote }}>
      {props.children}
    </Notecontext.Provider>
  )


}
export default NoteState;