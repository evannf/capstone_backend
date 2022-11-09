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

//UPDATE POST

//DELETE POST

//LIKE POST

module.exports = router;