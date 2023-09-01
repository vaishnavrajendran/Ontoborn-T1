import { Request, Response } from "express";
import Tasks from "../models/Tasks";

export const getTask = async (req: Request, res: Response) => {
    try {
        const getUserTasks = await Tasks.find({ userId: req.user?.id })
        if (getUserTasks)
            res.status(200).json(getUserTasks)
    } catch (error) {
        console.log("Error occured while fetching tasks from db", error);
    }
}

export const addTask = async (req: Request, res: Response) => {
    try {
        const addTask = new Tasks({
            userId: req.user?.id,
            name: req.body.name,
            description: req.body.desc,
            status: req.body.status
        })
        await addTask.save().then(updatedTasks => {
            res.status(201).json(updatedTasks)
        })
    } catch (error) {
        console.log("Error occured while adding to db", error);
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try {
        if (req.user)
            await Tasks.deleteOne({ _id: req.body.taskId, userId: req.user.id })
        return res.status(201).json({ status: true })
    } catch (error) {
        console.log("Error occured while deleting from db", error);

    }
}

export const updateTask = async (req: Request, res: Response) => {
    try {
        const { taskId, inputValue, inputDesc, status } = req.body
        const updateObj = {
            name: inputValue,
            description: inputDesc,
            status: status
        }
        const updateTask = await Tasks.findByIdAndUpdate({ _id: taskId }, updateObj, { new: true })
        return res.status(201).json(updateTask)
    } catch (error) {
        console.log("Error ocured while updating to db", error)
    }
}