const express = require('express');
const router = express.Router();
const {body ,validationResult} = require('express-validator');
const User = require('../models/User');
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
      user = await User.create({
        name: req.body.name ,
        email: req.body.email ,
        password: req.body.password
    })
    res.json(user)
} catch (error){
    console.log(error.message);
    res.status(500).send("Some error occured")
}
})
module.exports = router
