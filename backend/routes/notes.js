const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const {body ,validationResult} = require('express-validator');
router.get('/fetchallnotes',fetchuser, async (req ,res)=>{
    try {
        const notes = await Notes.find({user:req.user.id});
        res.json(notes)
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured")
    }
})
router.post('/addnote',fetchuser,[
    body('title' , 'Enter a valid title').isLength({min:3}) ,
    body('description', 'description must be atleast 5 character').isLength({min:5}) ,
] , async (req ,res)=>{
    try {
        
    
     const {title , description , tag} = req.body
        const errors = validationResult(req);
        console.log(errors)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const note = new Notes({
          title, description , tag , user:req.user.id
        })
        const savednotes = await note.save()
    res.json(savednotes)}
    catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured")
    }
})
router.put('/updatenote/:id',fetchuser, async (req ,res)=>{
   const {title , description , tag} = req.body;
   const newNote = {};
   try {
       if(title) {newNote.title = title}
       if(description) {newNote.description = description}
       if(tag) {newNote.tag = tag}
       let note =  await Notes.findById(req.params.id)
       if(!note) { return res.status(404).send("Not found")} // note not found
       if(note.user.toString()!== req.user.id){
        return res.status(401).send("Not allowed")
       }
       console.log("hello")
       note = await Notes.findByIdAndUpdate(req.params.id ,{$set: newNote} ,{new:true});
       res.json({note})
    
   } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured")
   }
})
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router