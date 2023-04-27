import express from "express";
import { DeleteTask, UpdateTask, getMyTask, newTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();


router.post("/Tasks/new",isAuthenticated,newTask)

router.get("/Tasks/my",isAuthenticated,getMyTask)


// router.put("/Tasks/:id",UpdateTask)

router.route("/Tasks/:id").put(isAuthenticated,UpdateTask).delete(isAuthenticated,DeleteTask)


export default router;