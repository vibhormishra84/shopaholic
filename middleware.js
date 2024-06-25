const Product = require('./models/Product');
const {productSchema,reviewSchema}=require('./schema')

const validateProduct=(req,res,next)=>{
    let {name,img,price,desc}=req.body;
    const {error}=productSchema.validate({name,img,price,desc})
    if(error){
        res.render('error')
    }
    next();
}
const validateReview=(req,res,next)=>{
    let {rating,comment}=req.body;
    const {error}=reviewSchema.validate({rating,comment})
    if(error){
        res.render('error')
    }
    next();
}
const isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error','Please login first');
        return res.redirect('/login');
    }
    next();
}
const isSeller=(req,res,next)=>{
    if(!req.user.role){
        req.flash('error','You do not have the permission to do that');
        return res.redirect('/products');
    }
    else if(req.user.role!=='seller'){
        req.flash('error','You do not have the permission to do that');
        return res.redirect('/products');
    }
    next();
}
const isMatched=async(req,res,next)=>{
    let {id}=req.params;
    let product=await Product.findById(id);
    if(req.user.role!=='seller' || !product.author.equals(req.user._id)){
        req.flash('error','You do not have the permission to do that');
        return res.redirect('/products');
    }
    next();
}
module.exports={isMatched,isSeller,validateProduct,validateReview,isLoggedIn}