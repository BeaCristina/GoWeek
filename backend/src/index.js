const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect(
    'mongodb://goweek:goweek123@ds141812.mlab.com:41812/backend-teste', {
        useNewUrlParser: true
    }
);

app.use((req, res, next) =>{
    req.io = io;

    return next();
});

app.use(cors());
app.use(express.json());
app.use(require('./routes')); 

server.listen(8080, () => {
    console.log('Server started on port 8080');
});