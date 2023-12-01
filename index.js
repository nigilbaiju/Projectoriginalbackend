// import express
const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const multer = require('multer');

//Initailizing
const app=new express();
const categorymodel = require('./model/category')
const itemmodel = require('./model/item')


const storage = multer.memoryStorage(); // Store images in memory
const upload = multer({ storage: storage });

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());


//Api Creation
app.get('/',(request,response)=>{
    response.send("hai")
})

//For Category
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


app.put('/updatestatus/:id',async(request,response) => {
    let id = request.params.id;
    await categorymodel.findByIdAndUpdate(id, { $set: { status: "INACTIVE" } })
    response.send("Status updated")
})


app.put('/cedit/:id',async(request,response) => {
    let id = request.params.id;
    await categorymodel.findByIdAndUpdate(id,request.body)
    response.send("Record updated")
})

//For item


app.post('/itemimagenew', upload.single('image'), async (req, res) => {
  try {
    const { icode,iname,cid,status } = req.body;

    const newitem = new itemmodel({
      icode,
      iname,
      cid,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      status
    });

    await newitem.save();
    res.status(200).json({ message: 'Item added successfully' });
  } 
  catch (error) {
    console.error('Error uploading product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//For itemview

app.get('/itemview',async(request,response) => {

    const result = await itemmodel.aggregate([
      {
        $lookup: {
          from: 'categories', // Name of the other collection
          localField: 'cid', // field of item
          foreignField: '_id', //field of category
          as: 'cat',
        },
      },
    ]); 

    response.send(result)
})

//For item Status updation - Delete
app.put('/updatestatusitem/:id',async(request,response) => {
  let id = request.params.id;
  await itemmodel.findByIdAndUpdate(id, { $set: { status: "INACTIVE" } })
  response.send("Status updated")
})
//Assign Port 
app.listen(3005,(request,response)=>{
    console.log("Port is running in 3005")
})

