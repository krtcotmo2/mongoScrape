const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const routes = require('./controllers/router');

const PORT = process.env.PORT || 8080;
const app = express();
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', routes);
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
