import mongoose from "mongoose";

export const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"apiProject"
    }).then(()=>{
        console.log("database is connected")
    }).catch(console.error());
}