require("dotenv").config();
const mongoose=require("mongoose");
const connectionToDataBase=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('MongoDB connection success');
    }
    catch(err){
        console.error('Mongodb connection failed');
        process.exit(1);
    }
}
module.exports=connectionToDataBase;