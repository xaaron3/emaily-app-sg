const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User'); // order above, matters bc attempt to use, will get error
require('./models/Survey'); 
require('./services/passport'); // order below

// use mongoose to create new collection in mongo called "users"
mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
   cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey]
   })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
   // express will serve up prod assets, like main.js or main.css files
   app.use(express.static('client/build'));

   // express will serve up the index.html file
   // if it doesnt recognize the route
   const path = require('path');
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
