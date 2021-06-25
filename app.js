const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const loginChecker = require('./middleware/loginChecker');
const RedisConnect = require('connect-redis')(session);
const { Success, Error } = require('./model/resModel');


const app = express();

const ENV = process.env.NODE_ENV
if (ENV !== 'production') {

  app.use(logger('dev'));
} else {

  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }));
}

const usersRouter = require('./routes/users');
const articleRouter = require('./routes/article');
const momentRouter = require('./routes/moment');


app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/public',express.static( 'public'));

const redisClient = require('./database/redis');
const sessionStore = new RedisConnect({
  client: redisClient
});

app.use(session({
  secret: 'ottoISmyF4ther#',
  cookie:{
       maxAge: 30* 24 * 60 * 60 * 1000
  },
  store: sessionStore
}));

app.use(
  '/css/bootstrap.css',
  express.static('node_modules/bootstrap/dist/css/bootstrap.css')
);


app.use('/users', usersRouter);
app.use('/article', articleRouter);
app.use('/moment', momentRouter);


app.use(express.static(path.join(__dirname, 'public')));
app.get('/chat', loginChecker, (req, res, next) => {

  const username = req.session.username;
  let userdata =  {username: username};
  res.json(new Success(userdata));
  //res.sendFile(__dirname + '/public/index.html');

});


app.listen(app.get('port'), () => {
  console.log('App started on port', app.get('port'));
});


module.exports = app;
