const mongoose=require('mongoose')
const Product=require('./models/Product')

const products=[
    {
        name:"Macbook M2",
        img:"https://images.unsplash.com/photo-1675868374786-3edd36dddf04?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWFjYm9vayUyMG0yfGVufDB8fDB8fHww",
        price:150000,
        desc:"elephant recommends"
},
    {
        name:"Iphone 14 pro",
        img:"https://images.unsplash.com/photo-1688780074342-7dddd9b5f582?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGlwaG9uZTE0cHJvfGVufDB8fDB8fHww",
        price:130000,
        desc:"penguins recommends"
    },
    {
        name:"IPad Pro 11th Generation",
        img:"https://images.unsplash.com/photo-1661340272675-f6829791246e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aXBhZCUyMHBybyUyMG0xfGVufDB8fDB8fHww",
        price:80000,
        desc:"Giraffes recommends"
    },
    {
        name:"Apple Airpods Gen3",
        img:"https://images.unsplash.com/photo-1610438235354-a6ae5528385c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGUlMjBhaXJwb2RzfGVufDB8fDB8fHww",
        price:30000,
        desc:"Zebra recommends"
    },
    {
        name:"Apple Smart Watch SE4",
        img:"https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXBwbGUlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
        price:50000,
        desc:"Badger recommends"
    }
]
async function seedDB(){
    await Product.insertMany(products);
    console.log("Products added to the database succesfully")
}
module.exports=seedDB