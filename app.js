var express = require("express"),
	app = express(),
	mv = require('mv'),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
var MongoStore = require("connect-mongo")(session);
//Requiring the model
var User = require("./models/user");
// Mongoose Setup 
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/crayon");
app.set("view engine", "ejs");

app.use('/uploads', express.static('uploads'));
app.use(express.static(__dirname + "/public"));
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	secret: "Rusty is the best and cutest dog in the world",
	resave: false,
	saveUninitialized: false,
	store: new MongoStore({
		mongooseConnection: mongoose.connection
	}),
	cookie: {
		maxAge: 180 * 60 * 1000
	}
})
);


// Passport Js Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// Making the logged in user available
app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

var indexRoutes = require('./routes/index/index');
var postRoutes = require('./routes/post/post');
var userPost = require('./routes/user/user');
// Routes
app.use('/user', userPost);
app.use("/post", postRoutes);
app.use("/", indexRoutes);


var port = process.env.PORT || '3000';
var ip = process.env.IP || 'localhost';
app.listen(port, ip, () => {
	console.log(`Server is Running on Port ${port}, visit http://${ip}:${port}/ `);
});