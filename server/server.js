var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3001 || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var server = require('http').Server(app);
var path = require('path');
var cors = require('cors');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var posts = require('./models/postSchema');
// var configDB = require('./config/database.js');
// configuration ===============================================================
mongoose.connect('mongodb://Xemylian:Sinavova123@ds121212.mlab.com:21212/newsitedb'); // connect to our database
require('./config/passport.js')(passport);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname)));

// app.use(sassMiddleware({
//     src: path.join(__dirname, 'public'),
//     dest: path.join(__dirname, 'public'),
//     indentedSyntax: true, // true = .sass and false = .scss
//     sourceMap: true
// }));
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes/routes.js')(app, posts, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
console.log("Порт сервера: "+ port);
server.listen(port);