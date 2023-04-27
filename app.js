import express from "express";
import userRouter from "./routes/user.js" 
import TaskRouter from "./routes/task.js" 

import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";



import cors from "cors"




 export const app = express();

config({
    path:"./data/config.env"
})

//using middleware
app.use(express.json())//always up form the useRouter
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,// agar ye nhi rhe ga to cookie sab front end par nhi pahuche ga
}))

//using routes
app.use(userRouter) // connecting the router to our main (app.js)
app.use(TaskRouter);



app.get("/",(req,res)=>{
    res.send("working")
})


// Using error middleware
app.use(errorMiddleware)


