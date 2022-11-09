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
        res.status(500).json(err);
    }
});

//UPDATE USER ROUTE


//DELETE USER ROUTE
module.exports = router