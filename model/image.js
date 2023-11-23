
const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://nigiljoseph2017:nigil@cluster0.gb23b3l.mongodb.net/shopdb?retryWrites=true&w=majority")
.then(()=>{console.log("DB connected")})
.catch(err=>console.log("Error Occurs"));

const imageSchema = new mongoose.Schema({
    data: Buffer,
    contentType: String,
  });
  
  const ImageModel = mongoose.model('Image', imageSchema);
  module.exports= ImageModel;