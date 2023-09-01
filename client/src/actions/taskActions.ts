import { AxiosResponse } from "axios";
import axios from "../config/axios";
import { TaskProps } from "../components/AddTask";

export type UpdateObjTypes = {
    taskId: string;
    inputValue: string;
    inputDesc: string;
    status: string;
  }

export const fetchUserTasks = async (token: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json",
            },
        };
        const response: AxiosResponse = await axios.get("/tasks/getTasks", config);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const addUserTasks = async (token: string, newTask: TaskProps) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json",
            },
        };
        const response: AxiosResponse = await axios.post("/tasks/addTask", newTask, config);
        return response.data;
    } catch (error) {
        console.log("Error occured while adding task", error);
    }
}

export const deleteUserTask = async (token: string, taskId: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json",
            },
        };
        const response: AxiosResponse = await axios.post("/tasks/deleteTask", { taskId }, config);
        return response.data;
    } catch (error) {
        console.log("Error occured while deleting", error);
    }
}

export const updateTask = async (token: string, updateObj: UpdateObjTypes) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json",
            },
        };
        const response: AxiosResponse = await axios.post("/tasks/updateTask", updateObj, config);
        return response.data;
    } catch (error) {
        console.log("Error occured while deleting", error);
    }
}