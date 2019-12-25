const mongoose = require('mongoose');

const learningSchema = mongoose.Schema({
    title: { type: String, required: true, maxlength: 100 },
    image: String,
    chapters: [
        {
            title: { type: String, required: true, maxlength: 100 },
            content: { type: String, required: true },

        }
    ]
});

const Learning = mongoose.model('Learning', learningSchema);
module.exports.Learning = Learning;