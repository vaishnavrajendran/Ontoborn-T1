/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Users from "../models/User";
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";

type UserObject = {
    _id: mongoose.Types.ObjectId,
    fName: string,
    lastName: string,
    email: string,
    token: string,
    verified?: boolean
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email: email });
        if (!user) {
            throw new Error("User does not exist. ");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid credentials. ");
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
        const userObj: UserObject = {
            _id: user._id,
            fName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token
        };
        res.status(200).json(userObj);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}


export const register = async (req: Request, res: Response) => {
    try {
        const user = await Users.findOne({ email: req.body.email });
        if (user) throw new Error('User already exists.Try login')
        else {
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(req.body.password, salt);
            const newUser = new Users({
                firstName: req.body.fName,
                lastName: req.body.lName,
                email: req.body.email,
                password: passwordHash,
            });
            await newUser.save().then((savedUser) => {
                const userToken = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET as string);
                const userObj: UserObject = {
                    _id: savedUser._id,
                    fName: savedUser.firstName,
                    lastName: savedUser.lastName,
                    email: savedUser.email,
                    token: userToken
                };
                return res.status(201).json(userObj);
            }
            )
        }
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}