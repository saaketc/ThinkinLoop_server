const router = require('express').Router();
const { User } = require('../models/users');
const auth = require('../middleware/auth');


// to save notes for a particular chapter
router.post('/:chapterId', auth, async (req, res) => {
    const id = req.params.chapterId;
    let userId = req.user._id;
    const notesContent = req.body.content;
    let user = await User.findById(userId);
    if (!user)
        return res.status(400).send('Bad request');
  
      //  const userNotes = user.notes.filter(note => note.chapter_id !== id);
   
        
        const notes = {
            chapter_id: id,
            content: notesContent
    }
        //  userNotes.push(notes)
        user.notes.push(notes);
        //user.notes = [...userNotes];
       await user.save();
        res.status(201).send(user.notes);
    
   
});

// to get notes
router.get('/', auth, async (req, res) => {
    const chapterId = req.params.chapterId;
    let userId = req.user._id;
    let user = await User.findById(userId);
    if (!user)
        return res.status(400).send('Bad request');
    
    const userNotes = user.notes.filter(note => note.chapter_id === chapterId);
    // if (userNotes.length === 0)
    //     return res.status(404).send("No notes found");
    res.status(200).send(user.notes);
    
});
module.exports = router;