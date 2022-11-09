const User = require('../models/user')
const router = require('express').Router();

//TEST ROUTE
router.get('/', (req, res) => {
    res.send('Hello users')
})

//GET USER ROUTE
router.get('/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        //create seperate objects from password and the rest of the document, now named 'public'
        const {password, ...public} = user._doc
        //return 'public' instead of 'user'
        res.status(200).json(public)
    } catch (err) {
        res.status(400).json(err);
    }
});

//UPDATE USER ROUTE
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id){
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
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
module.exports = router