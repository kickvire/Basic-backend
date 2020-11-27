
//Install mongoose and import mongoose
const express = require('express');
const app = express();
const mongoose = require("mongoose");

//Step 1:Creat Connection with database name:=Business
mongoose.connect('mongodb://localhost/Business')
.then(()=>console.log("Connected to mongodb"))
.catch((err)=>console.log('Exception Occured ', err));

//step:2:Create structure in which data stored in the database
const productSchema=new mongoose.Schema({
    name:String,
    brand:String,
    isIndian:Boolean,
    price:Number
})

//step:3: create collection with name:=product 
const Product=mongoose.model('product',productSchema);

//step:4: create data to add
//POST operation
//create data from req.body(from insomnia) and save to the collection product
app.use(express.json());//pipeline and middleware
app.post('/api/products',(req,res)=>{

    // step:4 create data
    const product=new Product(req.body);

   // step:5:Add to collection. This is the Post(create opn on mongodb)
    product.save().then(()=>console.log("save in database"));
    res.send(product);
})

//step:6 Go to mongodb compass and check it 

//GET operation:=find() on Model as on Product(its a model) not  on product(its a object)
app.get('/api/v1/products', (req, res) => {
    //Movie.find().limit(10).sort({name: 1}).select({name: 1, description: 1, releaseDate: 1}).then((movies) => res.send(movies));
    //Regular Expression => Movie.find({actors: {$in: [/.*manoj.*/i,/.*aamir.*/i]}}).then((movies) => res.send(movies));
    Product.find().then(products=> res.send(products));
});

app.get('/api/v1/products/:name', (req, res) => {
    const name = req.params.name;
    Product.find({actors: {$in: [new RegExp(name,"i")]}}).then((products) => res.send(products));
});

//PUT operatoin>=findByIdAndUpdate()
app.put('/api/v1/products/:id', (req, res) => {
    const id = req.params.id;
    Product.findByIdAndUpdate(id, req.body, {new: true, upsert: true}).then(result => {
        res.send(result);
    })
});

//PATCH opn:=findByIdAndUpdate() bt if not find then we can't add data in patch:=idempodency
app.patch('/api/v1/products/:id', (req, res) => {

    const id = req.params.id;
    Product.findByIdAndUpdate(id, req.body, {new: true}).then(result => {
        if(!result) {
            res.status(404).send("Product does not exist");
            return;
        }
        res.send(result);
    })
});


//Delete opn:=findByIdAndDelete
app.delete('/api/v1/products/:id', (req, res) => {
    const id = req.params.id;
    //if id does not exist, return 404

    Product.findByIdAndDelete(id, function(result) {
        if(!result) {
            res.status(404).send("Product not found");
            return;
        }
        res.send(result);
    });
});

app.listen(3000,()=>console.log("Server is connected"))
