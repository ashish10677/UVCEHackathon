const router = require('express').Router();
const Feed = require('../models/feed-model');

var Samplefeed={
  posts:[
    {
      username:"testuser",
      title:"title",
      body:"testbody",
      comments:[]
    }
  ]
  
}
router.get('/', (req, res) => {
  Feed.find({},function (err, feed) {
			if (err) return res.status(500).send({ error: err });
      res.render('forum',{feed:Samplefeed})
			// res.json(feed);
  })
});

module.exports = router;
