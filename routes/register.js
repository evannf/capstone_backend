const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

//test
router.get('/', async (req, res) => {
    res.send('hello register')
})

router.post('/', async (req, res) => {
    try{
        const secretPass = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

        //mongoose method save() used to create new or update documents
        //https://mongoosejs.com/docs/documents.html#updating-using-save  
        const newUser = new User({
            username: req.body.username,
            password: secretPass,
        });
        
        const user = await newUser.save();
        res.status(200).json(user);

    } catch(err){
        console.log(err)
    }
});

module.exports = router