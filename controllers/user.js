import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js"





 export const login = async(req,res,next)=>{
     try {
      
  const {email,password}=req.body;

  const user = await User.findOne({email}).select("+password");//select ("+password") becoz we have done select false in schema 

  if(!user){
    return res.status(404).json({
      success:false,
      message:"invalid email or password"
    })
  }

  const isMatch = await bcrypt.compare(password,user.password)

  if(!isMatch){
    return res.status(404).json({
      success:false,
      message:"invalid email or password"
    })
  }


  sendCookie(user,res,`welcome back ${user.name}`)
     } catch (error) {
      console.log(error)
     }

 }

 export const register = async(req,res)=>{
  try {
    const {name,email,password} = req.body

  const user = await User.findOne({email});

  if(user){
    return res.status(404).json({
      success:false,
      message:"User already exists"
    })

  }

  const hassedPassword = await bcrypt.hash(password,10)

  const Userr  = await User.create({
    name,
    email,
    password:hassedPassword
  })


  sendCookie(Userr,message="Registerd succesfully",res);
  } catch (error) {
    console.log(error)
  }
  
}




export const getMyProfile = (req,res)=>{ // /:id getting the id dynamically from the database

res.status(200).json({
  success:true,
  user:req.user
})

}



export const logout = (req,res)=>{
  

  res.status(200).cookie("token","",{expires:new Date (Date.now())}).json({
    success:true,
    message:"logout Succesfully",
    sameSite:process.env.NODE_ENV==="DEVELOPMENT"?"lax":"none", //backend kisi or url pr rhe ga or fronend kisi or url pr 
    secure:process.env.NODE_ENV==="DEVELOPMENT"?false:true
  })
}

 