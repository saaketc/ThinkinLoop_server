const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const mongoose = require('mongoose');
const crossDomain = require('./middleware/crossDomain');
// const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 5000;
const dbConnect = process.env.MONGODB_URI || 'mongodb://localhost:27017/thinkinloop';

const startDb = async () => {
    try {
        const val = await mongoose.connect(dbConnect, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('connected to db');
    }
    catch (e) {
        console.log(e.message);
    }
}
startDb();
// const mainRoute = require('./routes/main');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const quesRoute = require('./routes/questions');
const learningRoute = require('./routes/learning');
const notesRoute = require('./routes/notes');
const searchRoute = require('./routes/search');
const loopSpaceRoute = require('./routes/loopSpace');


app.use(crossDomain);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/questions', quesRoute);
app.use('/api/learning', learningRoute);
app.use('/api/notes', notesRoute);
app.use('/api/search', searchRoute);
app.use('/api/loopSpace', loopSpaceRoute);
// app.use(cors());

server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));