const User = require('../models/user')
const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hit user routes')
})

module.exports = router