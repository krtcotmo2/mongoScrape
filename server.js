const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const routes = require('./controllers/router');

const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';
const app = express();
mongoose.connect(MONGODB_URI);
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', routes);
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
