import { Task } from "../models/task.js"

export const newTask = async(req,res,next)=>{

try {
    const {title,description} = req.body

await Task.create({
    title,
    description,
    user:req.user
})


res.status(201).json({
    success:true,
    message:"Task added successfully"

})
    
} catch (error) {
    console.log(error)
    next(error)
}



}


export const getMyTask = async(req,res)=>{
try {
    const userid = req.user._id;

const tasks = await Task.find({user:userid})


res.status(200).json({
    success:true,
    tasks
})
} catch (error) {
    console.log(error)
}


}



export const UpdateTask = async(req,res,next)=>{
  

 try {
    const task = await Task.findById(req.params.id)

    if(!task) return next(new Error("Invalid id"));
    

    task.isCompleted = !task.isCompleted // ye models me false m he to !task.isCompleted , means true

     await task.save();

    res.status(200).json({
        success:true,
        message:"Task Updated"
    })
 } catch (error) {
    console.log(error)
 }
    
    
    }


    
export const DeleteTask = async(req,res,next)=>{
   
try {
    const task = await Task.findById(req.params.id)




if(!task) return next(new Error("Invalid Id"));


await task.deleteOne();

    res.status(200).json({
        success:true,
        message:"Task Deleted"
    })
} catch (error) {
    console.log(error)
}
    
    
    }


