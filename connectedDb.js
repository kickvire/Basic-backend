

//Install mongoose and import mongoose
const mongoose = require("mongoose");

//Step 1:Crate Connection
mongoose.connect('mongodb://localhost/exam')
.then(()=>console.log("Connected to mongodb"))
.catch((err)=>console.log('Exception Occured ', err));

//step:2:Create structure
const examSchema=new mongoose.Schema({
    name:String,
    eligibility:[String],
    age:Number,
    isExam:Boolean
})

//step:3: create collection 
const Pattern=mongoose.model('pattern',examSchema);

//step:4: create data to add
const patten=new Pattern({
    name:"Gate",
    eligibility:['B.tech',"diploma+3years"],
    age:21,
    isExam:true
})

//step:5:Add to collection
patten.save().then(()=>console.log("save in database"));

//step:6 Go to mongodb compass and check it 
