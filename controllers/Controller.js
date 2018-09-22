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
    
    //post request to verify number
    app.post('/verify_phone',jsonParser,function(req,res){
        //get data from mongodb and pass it to view
        console.log(req.body);
        console.log("+91"+req.body.phone);
        const client = require('twilio')(
          "AC061662d2d4a109724d16772ef79d3015","d784b07218dd2f02d0853dc40b9595d2"
        );
        client.validationRequests
        .create({
           friendlyName: req.body.name,
           phoneNumber: "+91"+req.body.phone
         })
        .then(validation_request => res.json(validation_request.validationCode))
        .done();
    });  
  
    //post request to send sms
    app.post('/send_sms',jsonParser,function(req,res){
        //get data from mongodb and pass it to view
        const client = require('twilio')(
          "AC061662d2d4a109724d16772ef79d3015","d784b07218dd2f02d0853dc40b9595d2"
        );
        client.messages.create({
          // from: "+15707225182",
          from: "+13203144713",
          to: "+91"+req.body.phone,
          body: "http://www.google.com/maps/place/12.9748561,77.58618249999999"
        }).then(message => console.log(message.sid));
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
        // User.findOne({email:req.body.email}).then((currentUser) => {
        //     if(currentUser){
        //         User.updateOne({email:req.body.email},req.body,{upsert:true}, function(err, data){
        //             if (err) return res.status(500).send({ error: err });
        //             return res.send("succesfully updated profile");
        //         });
        //     }
        //     else{
        //         return res.send("user profile doesnt exists");
        //         // var nlog={email:req.body.email,logs:[]};
        //         // var newLogs=ChangesLog(nlog).save(function(err,data){
        //         //     if (err) return res.status(500).send({ error: err });
        //         //     prev_cv = req.body.cv;
        //         //     return res.send("succesfully updated without change logs");
        //         //     // res.json(data);
        //         // });
        //     }
        // });
        console.log(req.body);
    });

    //post request to submit feed
    app.post('/submit_feed', function(req, res){
        req.body.time = new Date(Date.now()).toLocaleString();
        new Feed(req.body).save().then((newFeed) => {
            // done(null, newFeed);
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