const express = require('express');
const app = express();
const hbs = require('hbs');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();

app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var flash = require('connect-flash');

app.use(flash());


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.log('Error connecting to the database');
  });

app.set('trust proxy', 1);

app.use(
  session({
    secret: 'canBeAnything',
    resave: true,
    saveUninitialized: false,
    cookie: {
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 600000,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

app.use((req, res, next) => {
  res.locals.theUserObject = req.session.currentUser || null;
  next();
});

app.get('/', (req, res) => {
  res.render('index');
});

const playerRoutes = require('./routes/player-routes');
app.use('/', playerRoutes);

const courtRoutes = require('./routes/court-routes');
app.use('/', courtRoutes);

const userRoutes = require('./routes/user-routes');
app.use('/', userRoutes);

app.listen(process.env.PORT, () => console.log('Basketball app listening on port 3000!'));

