const router = require('express').Router();
const Feed = require('../models/feed-model');

var Samplefeed={
  posts:[
    {
      username:"testuser",
      title:"title",
      body:"testbody",
      comments:[]
    },
    {
      username:"testuser2",
      title:"title2",
      body:"testbody2",
      comments:[]
    },
    {
      username:"testuser3",
      title:"title3",
      body:"testbody3",
      comments:[]
    }
  ]
  
}
router.get('/', (req, res) => {
  Feed.find({},{'_id':0,'__v':0}, function (err, feed) {
			if (err) return res.status(500).send({ error: err });
      res.render('forum',{feed:Samplefeed})
			// res.json(feed);
  })
});

module.exports = router;
