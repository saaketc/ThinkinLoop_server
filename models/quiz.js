const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
    activityType: String,
    topic: String,
    content: [
        {
            question: String,
            answer: String,
            options: [ String ]
        }
    ]

});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = { Quiz };