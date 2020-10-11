const express = require('express');
const mongoose = require('mongoose');
// const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');

const guestRoutes = require('./routes/guest');
const eventRoutes = require('./routes/event');

const keys = require('./config/keys');
const app = express();

mongoose.connect(keys.mongoURI)
  .then(() => console.log('MongoDB connected.'))
  .catch(error => console.log(error));

// app.use(passport.initialize());
// require('./middleware/passport')(passport);

app.use(require('morgan')('dev'));
app.use('/uploads', express.static('./_uploads'));
app.use('/assets', express.static('./assets'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('cors')());

app.use('/api/guest', guestRoutes);
app.use('/api/event', eventRoutes);

// C L I E N T
app.use(express.static('./client/dist/client'));

app.get('/*', function(request, response) {
    response.sendFile(path.join(__dirname,'/client/dist/client/index.html'));
});


module.exports = app;
