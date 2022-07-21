require('dotenv').config();
const {config} = require('./configs');

const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const socketIO = require('socket.io');

const {userRouter, authRouter} = require('./routes');
const cronRun = require('./cron');
const swaggerJson = require('./swagger.json');

mongoose.connect(config.MONGO_URL);

const app = express();
const server = http.createServer(app);

const io = socketIO(server, {cors: 'http://localhost:63342'});

io.on('connection', (socket) => {
    console.log(socket.handshake.query);
    console.log(socket.handshake.auth);
//--------------------------------------------
    socket.on('sendMessage', (messageData) => {
        const {message} = messageData;
        console.log('Socket', socket.id, 'with auth token', socket.handshake.auth['token'], 'send message', message);

        // Emit To all connected clients except the sender
        socket.broadcast.emit('message:received', {
            socket: socket.id,
            message: message
        });

        setTimeout(() => {
            // Emit To all connected clients
            io.emit('globalBroadcast', 'TEST SOCKET');
        }, 2000);
    });
//----------------------------------------------
    socket.on('room:join', (joinInfo) => {
        socket.join(joinInfo.roomId); // call join to subscribe the socket to a given channel (room)

        // To all room members
        // io.to(joinInfo.roomId).emit('room:newMember', {id: socket.id, roomId: joinInfo.roomId});

        // To all room members except the sender
        socket.to(joinInfo.roomId).emit('room:newMember', {id: socket.id, roomId: joinInfo.roomId});
    });

});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

if (config.NODE_ENV !== 'prod') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

// app.use(cors(_configureCors()));
app.use(cors());

app.use('/users', userRouter);
app.use('/auth', authRouter);
// app.use('/auth', cors(_configureCors()), authRouter);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.use('*', (req, res) => {
    res.status(404).json('Route not found');
});

app.use((err, req, res, next) => {
    res.status(err.status || 400).json({
        error: err.message || 'Unknown Error',
        code: err.status || 400,
    });
});

server.listen(config.PORT, () => {   // app.listen
    console.log(`Started on port ${config.PORT}`);

    cronRun();
});

function _configureCors() {
    const whitelist = config.CORS_WHITE_LIST.split(';');

    console.log(whitelist);

    return {
        origin: (origin, callback) => {
            console.log(origin);

            console.log(whitelist.includes(origin));

            if (whitelist.includes(origin) || !origin) {
                return callback(null, true);
            }

            callback(new Error('Not allowed by CORS'));
        },
    };
}
