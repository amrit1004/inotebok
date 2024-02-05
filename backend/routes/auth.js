const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
var jwt = require('jsonwebtoken');
const {body ,validationResult} = require('express-validator');
const User = require('../models/User');
const JWT_SECRET = 'Amrit$inghal'
// Create a User using : Post "api/auth/" Doesnot require Auth
router.post('/createuser',[
    body('name').isLength({min:3}) ,
    body('email').isEmail() ,
    body('password').isLength({min:5}) ,

] , async (req ,res)=>{
    const errors = validationResult(req);
    console.log(errors)
    if(!errors.isEmpty()){
        return res.send(400).json({errors:errors.array()});
    }
    // check whether the email exist already
    try{
    let user = await  User.findOne({email:req.body.email})
    if(user){
        return res.status(400).json({error:"Sorry a user with this email already exist"})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await  bcrypt.hash(req.body.password , salt);
      user = await User.create({
        name: req.body.name ,
        email: req.body.email ,
        password: secPass ,
    });
    const data = {
        user:{
         id :user.id
        }
    }
    const authToken = jwt.sign(data ,JWT_SECRET)
    //console.log(authToken);
    res.json({authToken})
} catch (error){
    console.log(error.message);
    res.status(500).send("Some error occured")
}
})
module.exports = router
