const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
    topic: String,
    content: [
        {
            question: String,
            answer: String
        }
    ]

});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = { Quiz };