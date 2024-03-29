const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
var jwt = require('jsonwebtoken');
const {body ,validationResult} = require('express-validator');
const User = require('../models/User');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'Amrit$inghal'
// Create a User using : Post "api/auth/create" Doesnot require Auth
router.post('/createuser',[
    body('name').isLength({min:3}) ,
    body('email').isEmail() ,
    body('password' , 'password must be atleast 5 character').isLength({min:5}) ,

] , async (req ,res)=>{
    let success = false
    const errors = validationResult(req);
    console.log(errors)
    if(!errors.isEmpty()){
        return res.status(400).json({success ,errors:errors.array()});
    }
    // check whether the email exist already
    try{
    let user = await  User.findOne({email:req.body.email})
    if(user){
        return res.status(400).json({ success ,error:"Sorry a user with this email already exist"})
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
    success = true
    res.json({success , authToken})
} catch (error){
    console.log(error.message);
    res.status(500).send("Some error occured")
}
})
// login a User using : Post "api/auth/login"
router.post('/login',[

    body('email' ,'Enter a valid Email').isEmail(),
    body('password' ,'Enter a valid Email').exists(),
] , async (req ,res)=>{
    const errors = validationResult(req);
    console.log(errors)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email , password } = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Pls try to login with correct credential"});
        }
        const passwordCompare =await bcrypt.compare(password ,user.password)
        if(!passwordCompare){
            success = false;
            return res.status(400).json({ success ,error:"Pls try to login with correct credential"});
        }
        const data = {
            user:{
             id :user.id
            }
        }
        const authToken = jwt.sign(data ,JWT_SECRET)
        //console.log(authToken);
        success = true;
        res.json({ success ,authToken})
            
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured")
    }
})
// get user detail
router.post('/getuser', fetchuser , async (req ,res)=>{
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured")
    }
})
module.exports = router
