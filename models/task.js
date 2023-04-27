import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title:{
        type:String,
        required:true

    },
    description:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        default:false,
    },

    user:{
        type:mongoose.Schema.Types.ObjectId, // the object id which is in the database
        ref:"User",// of the collection which is in the database
        required:true
    },
    
    createdAt:{
        type:Date,
        default:Date.now,
    }
})


export const Task = mongoose.model("Task",schema);