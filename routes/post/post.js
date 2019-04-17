var express = require("express");
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var mongoose = require("mongoose");
var middleware = require("../../middleware");
var Post = require("../../models/post");
var Like = require("../../models/like");

// Multer Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
const fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});



// Creating a new Post 
router.post("/", [middleware.isLoggedIn, upload.single('image')], (req, res) => {
    if (req.file == undefined) {
        var newPost = new Post({
            author: req.user.username,
            content: req.body.content
        });
    } else {
        var newPost = new Post({
            author: req.user.username,
            content: req.body.content,
            image: req.file.path
        });
    }
    newPost.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

router.get('/search', middleware.isLoggedIn,(req, res) => {
    Post.find({ content: { $regex: req.query.searchText, $options: 'i' } }, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.render("search-result", { posts: result });
        }
    });
});

// Like Functionality 
router.post("/like/:id/:username", middleware.isLoggedIn, (req, res) => {
    var username = req.params.username;
    var postId = req.params.id;
    Post.findById(req.params.id, (err, thePost) => {
        if (err) {
            console.log(err);
        } else {
            // Check if the User has already liked the Post
            Like.find({ author: username, postId: postId }, (req, theLike) => {
                if (err) { console.log(err); } else {
                    if (theLike.length == 0) {
                        // If not liked, Do this
                        thePost.likes += 1;
                        thePost.save();
                        // Save it to the Like Database as well
                        var newLike = new Like({
                            author: username,
                            postId: postId
                        });
                        newLike.save(function (err) {
                            if (err) { console.log(err); }
                        });
                        res.send({ likeCount: thePost.likes });
                    } else if (theLike.length == 1) {
                        // Already Liked
                        thePost.likes -= 1;
                        thePost.save();
                        Like.deleteOne({ author: username, postId: postId }, (err, deletedLike) => {
                            if (err) { console.log(err); } else {
                                console.log(deletedLike);
                            }
                        });
                        res.send({ likeCount: thePost.likes });
                    } else {
                        res.send({ likeCount: thePost.likes });
                    }
                }
            });
        }
    });
});

module.exports = router;