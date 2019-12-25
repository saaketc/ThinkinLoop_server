const router = require('express').Router();
const _ = require('lodash');

const { Learning } = require('../models/learning');

// to add a chapter in a topic
router.post('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        let learning = await Learning.findById(id);

        if (!learning)
            return res.status(404).send("Topic not found");
        learning.chapters.push(req.body);
        await learning.save();
        return res.status(201).send(learning);
    }
    catch (ex) {
        res.status(500).send("Something went wrong");
    }
})

// to add a topic with chapter // need to implement admin login to add content
router.post('/', async (req, res) => {
    try {
        let learning = new Learning(_.pick(req.body, ['title', 'image', 'chapters']));
        await learning.save();
        res.status(201).send(learning);
        }
    catch (ex) {
        res.status(500).send("Something went wrong. Please try again.");
    }
})
// to get all topics in dashbard
router.get('/', async (req, res) => {
    try {
        const topics = await Learning.find({});
        res.status(200).send(topics);
    }
    catch (ex) {
        res.status(500).send('Something went wrong');
    }
})

// // to get a particular topic throught topic name
// router.get('/:topic/:title', async (req, res) => {
//     const topicTitle = req.params.topic
//     const title = req.params.title
//     res.status(200).send({ topicTitle, title });
//     // try {
//     //     let topic = await Learning.find({ title: topicTitle });
//     //     if (!topic)
//     //         return res.status(404).send('Topic not found');
//     //     res.status(200).send(topic);
//     // }
//     // catch (e) {
//     //     res.status(500).send('Something went wrong');
//     // }
// })
// to get a particular chapter of topic
router.get('/:title', async (req, res) => {
    const topicTitle = req.params.title;
   
    try {
        let topic = await Learning.findOne({ title:topicTitle });
        if (!topic)
            return res.status(404).send('Topic not found');
        res.status(200).send(topic);
    }
    catch (e) {
        res.status(500).send('Something went wrong');
    }
})
module.exports = router;