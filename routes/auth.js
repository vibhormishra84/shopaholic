const express=require('express');
const router=express.Router();
const User=require('../models/User');
const passport = require('passport');

router.get('/register',(req,res)=>{
    res.render('auth/signup')
})

//actually want to register my user in my db
router.post('/register',async (req,res)=>{
    let {username,email,password,role}=req.body
    const user=new User({email,username,role})
    const newUser=await User.register(user,password);
    req.login(newUser,(err)=>{
        if(err){return next(err)}
        req.flash('sucess',"succesful there welcome");
        return res.redirect('/products')
    })
    
})
//to get the form to login
router.get('/login',(req,res)=>{
    res.render('auth/login')
})
//to actually login via the DB
router.post('/login',
passport.authenticate('local', { 
    failureRedirect: '/login', 
    failureMessage: true }),
    (req,res)=>{
        // console.log(req.user);
        req.flash('sucess','Welcome Back')
        res.redirect('/products')
})

router.get('/logout',(req,res)=>{
    ()=>{
        req.logOut();
    }
    req.flash('error','Sad to see you leaving')
    res.redirect('/login')
    
})
module.exports=router