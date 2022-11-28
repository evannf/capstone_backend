const User = require('../models/user')
const router = require('express').Router();

// //TEST ROUTE
// router.get('/', (req, res) => {
//     res.send('Hello users')
// })

//GET USER ROUTE
router.get('/', async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try{
        const user = userId 
          ? await User.findById(userId) 
          : await User.findOne({ username: username });

        const {password, ...profile} = user._doc

        res.status(200).json(profile)
    } catch (err) {
        res.status(400).json(err);
    }
});

//UPDATE USER ROUTE
router.put('/:username', async (req, res) => {
    //Check to see if this is the current logged in user
    if (req.body.userId === req.params.id){
        try {
            await User.findByIdAndUpdate(req.params.id, {
              $set: req.body,
            });
            res.status(200).json("Account updated");
          } catch (err) {
            return res.status(400).json(err);
          }
        } else {
          return res.status(400).json("This is not your account");
        }
    });


//DELETE USER ROUTE
router.delete('/:username', async (req, res) => {
    if (req.body.userId === req.params.id){
        try {
            await User.findByIdAndDelete(req.params.id, {
              $set: req.body,
            });
            res.status(200).json("Account deleted");
          } catch (err) {
            return res.status(400).json(err);
          }
        } else {
          return res.status(400).json("This is not your account");
        }
    });

module.exports = router