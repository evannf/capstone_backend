const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hit login routes')
})

module.exports = router