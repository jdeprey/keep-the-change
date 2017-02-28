// add the top two lines (without trailing comma) to any page you want to connect the database on.
// Then use the knex variable to perform queries.

var database = require('./util/database.js'),
knex = database.connect(),
express = require('express'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
cookieSession = require('cookie-session'),
serveStatic = require('serve-static'),
expressValidator = require('express-validator'),
flash = require('connect-flash'),
swig = require('swig'),
passport = require('passport'),
crypto = require('crypto'),
Bookshelf = require('bookshelf'),
messages = require('./util/messages');

var app = express();

Bookshelf.mysqlAuth = Bookshelf(knex);

app.use(cookieParser('halsisiHHh445JjO0'));
app.use(cookieSession({
    keys: ['key1', 'key2']
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(expressValidator());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(serveStatic('./public'));
//app.use(express.favicon(__dirname + '/public/images/shortcut-icon.png'));
app.use(messages());

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

require('./util/auth')(passport);
require('./routes')(app, passport);

app.listen(process.env.PORT || 3000);

console.log('Listening on port 3000');

