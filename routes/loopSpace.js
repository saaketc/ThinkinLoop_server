const router = require('express').Router();
const _ = require('lodash');

const { Quiz } = require('../models/quiz');

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