export const errorMiddleware = (err,req,res,next)=>{
    console.log(err.message)// Invalid id will we be printed in the termainal 
    return res.status(404).json({
        success:false,
        message:err.message
    })
}