const router = require('express').Router();
const Post = require('../models/post.js')
const db = require("../models");
const { User } = require('../models');
// //test
// router.get('/', async (req, res) => {
//     res.send('posts')
// })

//CREATE POST ROUTE
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    try{
        const post = await newPost.save();
        res.status(200).json(post)
    } catch (err) {
        res.status(400).json(err);
    }
});

// GET POSTS FROM ALL USERS
router.get("/all", (req, res) => {
  db.Post.find({}, (err, posts) => {
    if (err) return res.status(400).json({ error: err.message });
    return res.status(200).json({
      posts
    });
  });
})


//GET SINGLE POST
router.get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);

    } catch (err) {
      res.status(500).json(err);
    }
    
  });

//  GET ALL POSTS FROM A SINGLE USER
//  router.get("/profile/:username", async (req, res) => {

//   try {
//     const posts = Post.find({ username: req.params.username });
//     res.status(200).json(posts)
//   } catch (err) {
//     res.status(400).json(err)
//   }
//  })

 router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});



//UPDATE POST ROUTE
router.put("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      if (post.username === req.body.username) {
        await post.updateOne({ $set: req.body });
        res.status(200).json("post updated");
      } else {
        res.status(400).json("this was posted by another user");
      }

    } catch (err) {
      res.status(400).json(err);
    }
  });

//DELETE POST ROUTE
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.username === req.body.username) {
      await post.deleteOne();
      res.status(200).json("post deleted");
    } else {
      res.status(400).json("this was posted by another user");
    }

  } catch (err) {
    res.status(400).json(err);
  }
});

//LIKE POST
router.put("/:id/like", async (req, res) => {
  try{
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.username)) {
      await post.updateOne({ $push: {likes: req.body.username}});
      res.status(200).json('Post Liked')
    } else {
      await post.updateOne({ $pull: { likes: req.body.username } });
      res.status(200).json('Post unliked')
    }
  } catch (err) {
    res.status(400).json(err);
  }
})




module.exports = router;