const router = require('express').Router();
const Cv = require('../models/user-model');

var user_name;
var user_data={
    user_exists:0,
    user_email:'',
    user_name:'',
    user_id:''
};


//function for user auth check
const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/');
    } else {
        user_data.user_name=req.user.username;
        user_data.user_email=req.user.email;
        user_data.user_id=req.user.id;
        next();
    }
};

//funtion to check whether user is registered to use this platform
// const checkUserRegistered = (req, res, next) => {
//     UserList.findOne({user: req.user.email},{'_id':0,'__v':0}, function (err, user) {
//         if (err) return res.status(500).send({ error: err });
//         if(user){
//             next();
//         }else{
//             res.redirect('/');
//         }
//     });
// };

//get request for rendering user profile page
router.get('/',authCheck, (req, res) => {
    res.render('profile');
});

//post request to get user data
router.post('/',function(req,res){
    //get data from mongodb and pass it to view
    res.json(user_data);

}); 


module.exports = router;
