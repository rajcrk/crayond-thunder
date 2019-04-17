var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var middleware = require("../../middleware");
var Post = require("../../models/post");

router.get('/:username', middleware.isLoggedIn, (req, res) => {
    Post.find({ author: req.params.username }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.render("profile", { posts: result });
        }
    });
});

module.exports = router;