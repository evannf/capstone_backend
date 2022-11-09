const router = require('express').Router();
const Post = require('../models/post.js')

//test
router.get('/', async (req, res) => {
    res.send('hello posts')
})

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

//GET SINGLE POST
router.get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });


//GET POSTS FROM ALL USERS



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

//DELETE POST
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

module.exports = router;