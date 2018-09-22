const router = require('express').Router();
const User = require('../models/user-model');


//function for user auth check
const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/');
    } else {
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
  console.log(req.user);
    res.render('profile',{user_data:JSON.stringify(req.user)});
});

//post request to get user data
router.post('/getdata',function(req,res){
    //get data from mongodb and pass it to view
    res.json(req.user);

}); 


module.exports = router;
