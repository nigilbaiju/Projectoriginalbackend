const mongoose=require("mongoose")
// mongoose.connect("mongodb+srv://nigil:nigil@cluster0.uxq2x1a.mongodb.net/?retryWrites=true&w=majority")
// .then(()=>{console.log("DB connected")})
// .catch(err=>console.log(err));

mongoose.connect("mongodb+srv://nigiljoseph2017:nigil@cluster0.gb23b3l.mongodb.net/shopdb?retryWrites=true&w=majority")
.then(()=>{console.log("DB connected")})
.catch(err=>console.log("Error Occurs"));


let cs=mongoose.Schema;
const categoryschema = new cs(
 {
    cid:String,
    ccode:Number,
    cname:String,
    status:String
}
);

var categorymodel =mongoose.model("Category",categoryschema)
module.exports=categorymodel;