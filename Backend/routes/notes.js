const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Notes')
const { body, validationResult } = require('express-validator');

//Route 1
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error has occoured")
    }
})


//Route 2
router.post('/addnote', [
    body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('description', 'Enter a valid description').isLength({ min: 4 })
], fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = await req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();

        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error has occoured")
    }
})

//Route-3
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //Create a new Note object
    try {
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        //find the note to be updated and update it.
        let note = await Note.findById(req.params.id);
        if (!note) { res.status(404).send("Not found") }

        //checking if the note belongs the user or not.
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error has occoured")
    }


})


//Route-4
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //find the note to be updated and delete it.
        let note = await Note.findById(req.params.id);
        if (!note) { res.status(404).send("Not found") }

        //checking if the note belongs the user or not.
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.send("Success, note is deleted");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error has occoured")
    }

})




module.exports = router