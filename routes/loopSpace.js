const router = require('express').Router();
const _ = require('lodash');

const { Quiz } = require('../models/quiz');

// For Quiz

// to post a quiz
router.post('/quiz', async (req, res) => {
    //const quiz = req.body;
    try {
        const quiz = await new Quiz(_.pick(req.body, ['topic', 'content']));
        await quiz.save();
        res.status(201).send(quiz);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
});

// to get quiz
router.get('/quiz', async (req, res) => {
    try {
         const quiz = await Quiz.find({}).select('-__v');
         res.status(200).send(quiz);
    }   
     catch (e) {
         res.status(500).send(e.message);
}   
});
module.exports = router;