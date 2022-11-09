const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

//test
router.get('/', async (req, res) => {
    res.send('hello login')
})

router.post('/', async (req, res) => {
    try {
        const user = await User.findOne({ 
            username: req.body.username
         });
        !user && res.status(404).json('please enter a valid username');
        
        const password = await bcrypt.compare(req.body.password, user.password)
        !password && res.status(404).json('please enter the correct password');

        res.status(200).json(user)
    } catch (err) {
        console.log(err);
    }
})

module.exports = router