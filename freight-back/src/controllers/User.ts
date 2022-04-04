import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";
import bcrypt from "bcrypt";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const saltRounds = 10;

    const { username, password } = req.body;

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username,
        password
    })

    user.password  = await bcrypt.hash(user.password, saltRounds);

    return user
        .save()
        .then(user => res.status(201).json({ user }))
        .catch(err => res.status(500).json({ err }))
}

const getUser = (req: Request, res: Response, next: NextFunction) => {

}

const getAllUser = (req: Request, res: Response, next: NextFunction) => {
    return User.find()
            .then((users) => {
                return users ? res.status(200).json({ users }) : res.status(404).json({ message: 'not found'});
            })
}
const UpdateUser = (req: Request, res: Response, next: NextFunction) => {}
const DeleteUser = (req: Request, res: Response, next: NextFunction) => {}

export default { createUser, getAllUser };