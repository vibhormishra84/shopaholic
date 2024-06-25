const { render } = require('ejs');
const express=require('express');
const Product=require('../models/Product')
const router=express.Router();
const {isMatched,isSeller,isLoggedIn,validateProduct}=require('../middleware')

// fiRST PAGE
    router.get('/', async (req,res)=>{
        try{
            let products=await Product.find({})
            res.render('products/index',{products});
        }
        catch(e){res.status(500).render('error',{err:e.message})}
    });
// to show all the products
    router.get('/products',async (req,res)=>{
        try{
            let products=await Product.find({})
            res.render('products/index',{products});
        }
        catch(e){res.status(500).render('error',{err:e.message})}
    });
//to show the form for new products
router.get('/product/new',isLoggedIn,(req,res)=>{
    try{
        res.render('products/new')
}
    catch(e){res.status(500).render('error',{err:e.message})}
})
//to actually add the product
router.post('/products',validateProduct,isLoggedIn,isSeller,async(req,res)=>{
    try{
        let {name,img,price,desc}=req.body;
        await Product.create({name,img,price,desc,author:req.user._id});
        req.flash('sucess','Product Added Succesfully')
        res.redirect('/products')
    }
    catch(e){res.status(500).render('error',{err:e.message})}
})
//to show the details of a particular product
router.get('/products/:id',isLoggedIn,async(req,res)=>{
    try{
        let {id}=req.params;
        let foundProduct=await Product.findById(id).populate('reviews');
        res.render('products/show',{foundProduct,msg:req.flash('msg')})
    }
    catch(e){res.status(500).render('error',{err:e.message})}
})
//form to edit the product
router.get('/products/:id/edit',isLoggedIn,async(req,res)=>{
    try{
        let {id}=req.params;
        let foundProduct=await Product.findById(id);
        res.render('products/edit',{foundProduct})
    }
    catch(e){res.status(500).render('error',{err:e.message})}
})
//to actually edit the data in db
router.patch('/products/:id',validateProduct,isLoggedIn,isMatched, async(req,res)=>{
    try{
        let {id}=req.params;
        let {name,img,price,desc}=req.body;
        await Product.findByIdAndUpdate(id,{name,img,price,desc});
        req.flash('sucess','Product Edited Succesfully')
        res.redirect(`/products/${id}`);
    }
    catch(e){res.status(500).render('error',{err:e.message})}
})
//to delete the item
router.delete('/products/:id',isLoggedIn,isMatched,async(req,res)=>{
    try{
        let {id}=req.params;
        await Product.findByIdAndDelete(id);
        req.flash('sucess','Product Deleted Succesfully')
        res.redirect('/products');
    }
    catch(e){res.status(500).render('error',{err:e.message})}
})
module.exports=router;