const mongoose = require('mongoose')
const Guitar = require("../models/Guitar");

// the seeds file is something we use only in development
// the purpose is just to populate the DB with some data in the beginning so 
// that we have some data to look at while we're building features

mongoose.connect('mongodb://localhost/guitarsApp')
.then(()=>{
    console.log("connected to database")
})
.catch((err)=>{
    console.log("error connecting to database");
})

const bunchaGuitars = [
    {
        model: "Takamine 12 String Acoustic", 
        condition: "Excellent", 
        price: 450, 
        img: "https://cf1.zzounds.com/media/productmedia/fit,2018by3200/quality,85/8_Full_Left_Front_NA-05e838685578cf54cb6108b2ed50beeb.jpg", 
        description: "Beautiful 12 string guitar, excellent condiiton, played only a few times, stored in A/C"
    },
    {
        model: "Martin D 16-GT", 
        condition: "Very Good", 
        price: 2000, 
        img: "https://www.gearank.com/sites/default/files/Martin-D-16GT.jpg", 
        description: "Great condition, only a few scratches.  Same model played by many famous musicians"
    },
    {
        model: "Gibson J-200", 
        condition: "Good", 
        price: 4000, 
        img: "https://www.samash.com/media/catalog/product/e/j/ej200anvs.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=1200&width=1200&canvas=1200:1200", 
        description: "The Same guitar LEd Zeppelin played in Over The Hills & Far Away"
    },
    {
        model: "Ovation Celebrity", 
        condition: "Excellent", 
        price: 350, 
        img: "https://cdn11.bigcommerce.com/s-9nhe6feo/images/stencil/1280x1280/products/75431/142650/DSC06047__68093.1647369803.jpg?c=2", 
        description: ""
    },
    {
        model: "Gibson Les Paul", 
        condition: "Very Good", 
        price: 2500, 
        img: "https://cdn.shoplightspeed.com/shops/643427/files/49163926/1652x1652x1/gibson-2022-gibson-les-paul-std-60s-faded-vintage.jpg", 
        description: "Its the Gibson les paul, the iconic electric guitar."
    },
]

Guitar.create(bunchaGuitars)
.then((response)=>{
    console.log(response);
})
.catch((err)=>{
    console.log(err);
})





