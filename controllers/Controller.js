var bodyParser=require('body-parser');
const User = require('../models/user-model');
const Feed = require('../models/feed-model');
const passportSetup = require('../config/passport-setup');
var path = require("path");
var exec = require('child_process').exec;

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended:false});


module.exports=function(app){
    var user_data;

    // create home route
    app.get('/', (req, res) => {
        // var ab=fs.readFileSync('resume.json','utf8');
        res.render('home', { user: req.user });
        // exec("ls",function(err,stdout){
        //     if(err){
        //         throw err;
        //     }
        //     console.log(stdout);
        // });
    });
    
    //post request to retrieve profile
    app.post('/retrieve_profile',jsonParser,function(req,res){
        //get data from mongodb and pass it to view
        User.findOne({email:req.body.email},{__v:0}).then((currentUser) => {
            if(currentUser){
                var curuser=JSON.stringify(currentUser);
                curuser=JSON.parse(curuser);
                // console.log(curuser);
                res.json(curuser);
            }
            else{
                res.send("no data").end();
            }
        });
    }); 

    //post request to submit prfile
    app.post('/submit_profile',jsonParser,function(req,res){
        User.findOne({email:req.body.email}).then((currentUser) => {
            if(currentUser){
                User.updateOne({email:req.body.email},req.body,{upsert:true}, function(err, data){
                    if (err) return res.status(500).send({ error: err });
                    return res.send("succesfully updated profile");
                });
            }
            else{
                return res.send("user profile doesnt exists");
                // var nlog={email:req.body.email,logs:[]};
                // var newLogs=ChangesLog(nlog).save(function(err,data){
                //     if (err) return res.status(500).send({ error: err });
                //     prev_cv = req.body.cv;
                //     return res.send("succesfully updated without change logs");
                //     // res.json(data);
                // });
            }
        });
    });

    //post request to submit feed
    app.post('/submit_feed', function(req, res){
        req.body.time = new Date(Date.now()).toLocaleString();
        new Feed(req.body).save().then((newFeed) => {
            done(null, newFeed);
        });
    });

    //post request to retrieve feed
    app.post('/retrieve_feed',jsonParser,function(req,res){
        //get data from mongodb and pass it to view
        Feed.find({},{'_id':0,'__v':0}, function (err, feed) {
            if (err) return res.status(500).send({ error: err });
            var feeds=JSON.stringify(feed);
            feeds=JSON.parse(feeds);
			res.json(feeds);
		});
    });
    
  
  };