import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Freight from "../models/Freight";

const createFreight = (req: Request, res: Response, next: NextFunction) => {
    const { name, type, weight, destination, owner_number, owner_email } = req.body;

    const freight = new Freight({
        _id: new mongoose.Types.ObjectId(),
        name,
        type,
        weight,
        destination,
        owner_number,
        owner_email,
        is_deleted: false
    })

    return freight
            .save()
            .then(freight => res.status(201).json({freight}))
            .catch(err => res.status(500).json({err}))
}

export default { createFreight };