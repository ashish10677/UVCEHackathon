const router = require('express').Router();
const Feed = require('../models/feed-model');

router.get('/', (req, res) => {
    res.render('forum',{})
});

module.exports = router;
