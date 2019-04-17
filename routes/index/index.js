var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../../models/user");
var Post = require("../../models/post");
var middleware = require("../../middleware");

var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../../models/user");

router.get("/", middleware.isLoggedIn, function (req, res) {
	Post.find({}, {}, { sort: { field: 'asc', _id: -1 } }, function (err, result) {
		if (err) { console.log(err); }
		else {
			res.render("index", { posts: result });
		}
	});
});

router.get("/login", function (req, res) {
	res.render("login");
});

router.post("/login", passport.authenticate("local", {
	failureRedirect: "/login"
}),
	function (req, res) {
		User.findOne({
			username: req.body.username
		}).exec().then();
		res.redirect("/");
	}
);


router.get("/register", function (req, res) {
	res.render("register");
})

router.post("/register", function (req, res) {
	User.register(
		new User({
			username: req.body.username
		}),
		req.body.password,
		function (err, user) {
			if (err) {
				console.log(err);
				return res.render("register");
			}
			passport.authenticate("local")(req, res, function () {
				res.redirect("/");
			});
		}
	);
});

// Logout Functionality 
router.get("/logout", function (req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;