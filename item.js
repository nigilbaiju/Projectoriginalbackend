const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://nigiljoseph2017:nigil@cluster0.gb23b3l.mongodb.net/shopdb?retryWrites=true&w=majority")
.then(()=>{console.log("DB connected")})
.catch(err=>console.log("Error Occurs"));

let cs=mongoose.Schema;
const itemschema = new cs(
 {
    icode:String,
    iname:String,
    cid: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories' },
    image: {
        data: Buffer,
        contentType: String,
      },
    status:String,
   
}
);

var itemmodel =mongoose.model("Item",itemschema)

module.exports=itemmodel;

