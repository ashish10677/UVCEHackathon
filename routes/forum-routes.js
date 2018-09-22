const router = require('express').Router();
const Feed = require('../models/feed-model');

var Samplefeed={
  posts:[
    {
      timestamp:"3 days ago",
      username:"testuser",
      title:"title",
      body:"testbody",
      likes:2,
      comments:[]
    },
    {
      timestamp:"2 days ago",
      username:"testuser2",
      title:"title2",
      body:"testbody2",
      likes:3,
      comments:[]
    },
    {
      timestamp:"1 day ago",
      username:"testuser3",
      title:"title3",
      body:"testbody3",
      likes:7,
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
