import React, { useState } from "react";
import Notecontext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"

    const notesInitial = [
        {
            "_id": "62c0bbd1966067552b6c2f36",
            "user": "62bfa325868f2c64689379d4",
            "title": "good girl",
            "description": "a nice book it is",
            "tag": "personal",
            "date": "2022-07-02T21:42:41.692Z",
            "__v": 0
        },
        {
            "_id": "62c28538963067572b7c2f39",
            "user": "62bfa325868f2c64689379d4",
            "title": "good girl",
            "description": "a nice book it is",
            "tag": "personal",
            "date": "2022-07-03T12:02:00.139Z",
            "__v": 0
        },
        {
            "_id": "62c18538963066572b6c2f39",
            "user": "62bfa325868f2c64689379d4",
            "title": "good girl",
            "description": "a nice book it is",
            "tag": "personal",
            "date": "2022-07-03T12:02:00.139Z",
            "__v": 0
        },
        {
            "_id": "62c18438966067572b7c2f39",
            "user": "62bfa325868f2c64689379d4",
            "title": "good girl",
            "description": "a nice book it is",
            "tag": "personal",
            "date": "2022-07-03T12:02:00.139Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesInitial)

    //add a note function
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiZmEzMjU4NjhmMmM2NDY4OTM3OWQ0In0sImlhdCI6MTY1NjcyNjMwOX0.pdKg4n46wZgBZHrf5yQSNPl4kT3U9Vz1WbSYlbZsNWk'

            },
            body: JSON.stringify(title, description, tag)
        });
        const json = response.json();

        const note = {
            "_id": "62c18538663067572b6c2f39",
            "user": "62bfa325868f2c64689379d4",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-07-03T12:02:00.139Z",
            "__v": 0
        };
        setNotes(notes.concat(note))

    }
    //delete note
    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => (note._id !== id))
        setNotes(newNotes);
    }

    //edit note
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/62c0bb52e256c7746232d351`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiZmEzMjU4NjhmMmM2NDY4OTM3OWQ0In0sImlhdCI6MTY1NjcyNjMwOX0.pdKg4n46wZgBZHrf5yQSNPl4kT3U9Vz1WbSYlbZsNWk'
            },
            body: JSON.stringify({ title, description, tag })
        });

        for (let i = 0; i < notes.length; i++) {
            const element = notes[i];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }



    }
    return (
        <Notecontext.Provider value={{ notes, addNote, deleteNote, editNote }}>
            {props.children}
        </Notecontext.Provider>
    )
}
export default NoteState;