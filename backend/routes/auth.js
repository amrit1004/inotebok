const express = require('express');
const router = express.Router();
const {body ,validationResult} = require('express-validator');
const User = require('../models/User');
// Create a User using : Post "api/auth/" Doesnot require Auth
router.post('/',[
    body('name').isLength({min:3}) ,
    body('email').isEmail() ,
    body('password').isLength({min:5}) ,

] , (req ,res)=>{
    const errors = validationResult(req);
    console.log(errors)
    if(!errors.isEmpty()){
        return res.send(400).json({errors:errors.array()});
    }
    User.create({
        name: req.body.name ,
        email: req.body.email ,
        password: req.body.password
    }).then(user=>res.json(user))
    .catch(err=>{console.log(err)
    res.json({error:"Pls enter a unique value for email" , message:err.message})});
    
})
module.exports = router
