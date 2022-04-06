import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import RemovedFreights from "../models/RemovedFreight";

const getRemovedFreight = (req: Request, res: Response, next: NextFunction) => {
    return RemovedFreights
    .find()
    .then(freights => {
        res.status(200).json({freights})
    })
    .catch(err => res.status(404).json({ message: 'No freights found.'}))
}

export default { getRemovedFreight }