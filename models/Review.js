const mongoose=require('mongoose')
const reviewSchema=new mongoose.Schema({
    rating: {
        type: Number,
        max:5,
        min: 0
    },
    comment: {
        type: String,
        trim: true
    }
},
{timestamps:true})
let Review=mongoose.model('Review',reviewSchema);
module.exports=Review;