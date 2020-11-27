//console.log("hello");

const express = require('express');
const app = express();
const data=require('./InitialData');
//console.log(data);
const port=3000;//port:- process.env.PORT||3000

//GET operation
app.get("/api/student",(req,res)=>{
       res.send(data);   
})
app.get("/api/student/:id",(req,res)=>{
    const id=req.params.id;
    const student=data.find(student=>student.id===parseInt(id));
    if(!student)
    {
        res.status(404).send('error');
        return;
    }
    res.send(student);
})

//For all POST/PUT/PATCH/DELETE->must check before to use the req.body,all field contains the data or not

//POST operation 
app.use(express.json());

app.post("/api/student", (req,res)=>{

    const student= {
        id:data.length +1,//id is added by yourself
        ...req.body,
        currentClass: parseInt(req.body.currentClass)
    }

    if(!student.name || !student.currentClass || !student.division){
        res.status(400).send();
        return;
    }
    data.push(student);
    let id = student.id; 
    res.send({"id":id});//return id of  new student 
})
//PUT operation
app.put('/api/student/:id',(req,res)=>{
    const id=req.params.id;

    //For Complete Update:-Change all data even only one is modified

    const studentIndex=data.findIndex(student=>student.id===parseInt(id));
    if(studentIndex===-1){
        const student={...req.body,id:data.length+1};// add id with unique number
        data.push(student);
        res.send(student);
        return;
    }
    data.splice(studentIndex,1,{...req.body,id:id});//add same id which is passed in url
    res.send(data[studentIndex]);

    //For partial Update:-Patch

    // const student=data.find(student=>student.id===parseInt(id));//find return undefined
    // if(!student){
    //     const student={...req.body,id:data.length+1};// add id with unique number
    //     data.push(student);
    //     res.send(student);
    //     return;
    // }
    // student.name=req.body.name;
    // res.send(student);
})

//PATCH operation
app.patch('/api/student/:id',(req,res)=>{
    const id=req.params.id;
     const student=data.find(student=>student.id===parseInt(id));//find return undefined
    if(!student){
        res.status(404).send("Not found")//At this put and patch is different
        return;
    }
    student.name=req.body.name;
    res.send(student);
})

//DELETE operation

app.delete('/api/student/:id',(req,res)=>{
    const id=req.params.id;
    const studentIndex=data.findIndex(student=>student.id===parseInt(id));
    if(studentIndex===-1){
        res.status(404).send('Error')
        return;
    }
    const deletedData=data[studentIndex];
    data.splice(studentIndex,1);//add same id which is passed in url
    res.send(deletedData);
})

app.listen(port,()=>console.log("Server Connected"));
