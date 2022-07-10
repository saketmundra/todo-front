const express=require('express')   
const router=express.Router();
const User=require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser')


const JWT_SECRET="saketisag00ddb0y"
//create a user using post request "/api/auth" no login required
router.post('/createuser',[
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a valid email ').isEmail(),
    body('password').isLength({ min: 5 }),
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
    let user=await User.findOne({email:req.body.email});
    if(user){
      return res.status(400).json({error:"Sorry a user with same email exist"})
    }
    const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);


    user=await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })
    const data={
      user:{
        id:user.id
      }
    }

    const authtoken=jwt.sign(data,JWT_SECRET);
    success=true;
    res.json({success,authtoken:authtoken})
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error has occoured")
  }
})


//Authenticate a User using Post "api/auth/login".
router.post('/login',[
  body('email','Enter a valid email ').isEmail(),
  body('password','Password cannot be blank').exists(),
],async(req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const{email,password}=req.body;
  try {
    let user=await User.findOne({email})
    if(!user){
      return res.status(400).json({error:"Enter correct details"})
    }
    const passcomp=await bcrypt.compare(password,user.password);
    if(!passcomp){
      success=false;
      return res.status(400).json({success,error:"Enter correct details"})
    }
    const data={
      user:{
        id:user.id
      }
    }
    const authtoken=jwt.sign(data,JWT_SECRET);
    success=true;
    res.json({success,authtoken:authtoken})
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occoured")
  }
})

router.post('/getuser',fetchuser,async(req,res)=>{
  try {
    userId=req.user.id;
    const user=await User.findById(userId).select("-password");
    res.send(user);
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occoured") 
  }
})

module.exports=router