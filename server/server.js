const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const https = require('https');
const userController = require('./controllers/userController');

const app = express();
const PORT = 3000;

/**
 * handle parsing request body
 */
app.use(express.json()); // recognize the incoming Request Object as a JSON Object.
app.use(express.urlencoded()); //recognize the incoming Request Object as strings or arrays.

/**
 * Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.
 *
 */
app.use(cookieParser());

/**
 * require routers
 */
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

//express server is serving all static assets found in your client folder & sending the images to the front end when it needs to find the images
/**
 * handle requests for static files
 */

app.use(express.static(path.join(__dirname, '../src')));

// catch-all route handler for any requests to an unknown route
app.use('*', (req, res) => {
  return res.sendStatus(404);
});

/**
 * configure express global error handler
 */

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };

  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.message);
  return res.status(errorObj.status).json(errorObj.status);
});

/**
 * start server
 */
const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

// Merriam Webster API
const appId = '5d31df20';
const appKey = '0ef1989e11f3eccf8ebb9f20590cdb28';
const language = 'en-us';
let wordId = 'banana';
const fields = 'definitions';
const strictMatch = 'false';

app.post('/dictionary', (req, res) => {
  let definition = 'Sorry, we cannot find this word';
  console.log('backend request:', req.body);
  wordId = req.body.body.vocab;
  console.log(wordId);

  const options = {
    host: 'od-api.oxforddictionaries.com',
    port: '443',
    path: `/api/v2/entries/${language}/${wordId.toLowerCase()}?fields=${fields}&strictMatch=${strictMatch}`,
    method: 'GET',
    headers: {
      app_id: appId,
      app_key: appKey,
    },
  };

  https.get(options, (resp) => {
    console.log('in https get request');
    let body = '';
    resp.on('data', (d) => {
      body += d;
    });
    resp.on('end', () => {
      try {
        const data = JSON.parse(body);
        definition =
          data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
        console.log(definition);
        res.status(200).json(definition);
      } catch {
        console.log(definition);
        res.status(200).json(definition);
      }
    });
  });
});

/**
 * setup socket
 */
const socketio = require('socket.io');
const io = socketio(server);

io.on('connection', (socket) => {
  console.log('socket.id => ', socket.id);
  const { name, room } = socket.handshake.query;

  console.log('before joining room => socket.rooms => ', socket.rooms);
  socket.join(room);
  console.log('After joining room => ', socket.rooms);

  socket.emit('message', {
    id: socket.id,
    name: 'Admin',
    room,
    text: `${name}, welcome to ${room} chatroom.`,
  });

  socket.to(room).emit('message', {
    id: socket.id,
    name: 'Admin',
    room,
    text: `${name} has joined!`,
  });

  socket.on('sendNewMessage', (message) => {
    io.in(room).emit('message', message);
  });

  socket.on('typing', (data) => {
    console.log('data-->', data);
    socket.to(room).emit('typingMsg', data);
    //socket.broadcast.to().emit has the same effect!!!
  });

  socket.on('disconnect', () => {
    socket.leave(room);
    socket.to(room).emit('message', {
      id: socket.id,
      name: 'Admin',
      room,
      text: `${name} has left!`,
    });
    console.log(name, ' has left ', room, ' chatroom!');
  });
});

module.exports = app;
