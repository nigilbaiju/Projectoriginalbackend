// import express
const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")

//Initailizing
const app=new express();
const categorymodel = require('./model/category')

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());


//Api Creation
app.get('/',(request,response)=>{
    response.send("hai")
})

//For Submit button
app.post('/cnew',(request,response)=>{
        console.log(request.body)
        new categorymodel(request.body).save();
        response.send("Record Sucessfully Saved")
    })

app.get('/cview',async(request,response) => {
    var data = await categorymodel.find();
    response.send(data)
})


const Item = mongoose.model('Categories', { cname: String });

app.get('/searchcategory', async (request, response) => {

    const searchTerm = request.query.cn;
    console.log(searchTerm);
    try {
      const results = await Item.find({cname: { $regex: new RegExp(searchTerm, 'i') }, });
      console.log(results);
      response.json(results);
    } 
    catch (error) {
      console.error(error);
      response.status(500).send('Internal Server Error');
    }
  });

app.delete('/deletec/:id',async(request,response) => {
    let id = request.params.id;
    await categorymodel.findByIdAndDelete(id)
    response.send("Record Deleted")
})
app.put('/cedit/:id',async(request,response) => {
    let id = request.params.id;
    await categorymodel.findByIdAndUpdate(id,request.body)
    response.send("Record updated")
})

//Assign Port 
app.listen(3005,(request,response)=>{
    console.log("Port is running in 3005")
})

