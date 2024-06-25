require('dotenv').config();
const express=require('express');

const app=express();
const path=require('path');
const mongoose = require('mongoose');
const seedDB=require('./seed')
const ejsMate=require('ejs-mate')
const methodOverride=require('method-override')
const flash=require('connect-flash')
const session=require('express-session')
const User=require('./models/User');
const passport=require('passport')
const LocalStrategy=require('passport-local')

const productRoutes=require('./routes/product')
const reviewRoutes=require('./routes/review')
const authRoutes=require('./routes/auth');
const cartRoutes=require('./routes/cart');
const { date } = require('joi');

mongoose.connect(process.env.DB_URL)
.then(()=>{console.log("db connected succesfully")})
.catch((err)=>{
               console.log("error")
})

app.engine('ejs',ejsMate)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(flash());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
      httpOnly:true,
      expires: Date.now()+ 7*24*60*60*1000,
      maxAge: 7*24*60*60*1000}
  }))

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
  res.locals.currentUser=req.user;
  // console.log(res.locals.currentUser)
  res.locals.sucess=req.flash('sucess')
  res.locals.error=req.flash('error')
  next();
})

//PASSPORT MIDDLEWARE
passport.use(new LocalStrategy(User.authenticate()));


app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);

app.listen(process.env.PORT,()=>{console.log("servver connected at port 8080")});