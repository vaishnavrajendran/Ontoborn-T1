import express, { Router } from "express";
import { verifyToken } from "../middlewares/auth";
import { addTask, getTask, deleteTask, updateTask } from "../controller/task";

const taskRouter: Router = express.Router();

/* GET */
taskRouter.get('/getTasks', verifyToken, getTask)

/* POST */
taskRouter.post('/addTask', verifyToken, addTask)
taskRouter.post('/deleteTask', verifyToken, deleteTask);
taskRouter.post('/updateTask', verifyToken, updateTask)


export default taskRouter;