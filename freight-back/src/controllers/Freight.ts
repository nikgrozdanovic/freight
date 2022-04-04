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

const getAllFreight = (req: Request, res: Response, next: NextFunction) => {
    return Freight
            .find()
            .where({is_deleted: false})
            .then(freights => {
                res.status(200).json({freights})
            })
            .catch(err => res.status(404).json({ message: 'No freights found.'}))
}

const getFreight = (req: Request, res: Response, next: NextFunction) => {
    const freightId = req.params.freightId;

    return Freight
            .findById(freightId)
            .then(freight => (freight ? res.status(200).json({ freight }) : res.status(404).json({message: 'Freight not found.'})))
            .catch(err => res.status(500).json({err}));
}

const updateFreight = (req: Request, res: Response, next: NextFunction) => {
    const freightId = req.params.freightId;

    return Freight
            .findById(freightId)
            .then(freight => {
                if(freight) {
                    freight.set(req.body);

                    return freight
                    .save()
                    .then(freight => res.status(201).json({freight}))
                    .catch(err => res.status(500).json({err}))
                } else {
                    res.status(404).json({message: 'Freight not found.'});
                }
            })
            .catch(err => res.status(500).json({err}));
}

const deleteFreight = (req: Request, res: Response, next: NextFunction) => {
    const freightId = req.params.freightId;

    return Freight
            .findById(freightId)
            .then(freight => {
                if(freight) {
                    freight.set({
                        is_deleted: true
                    });

                    return freight
                    .save()
                    .then(freight => res.status(201).json({freight}))
                    .catch(err => res.status(500).json({err}))
                } else {
                    res.status(404).json({message: 'Freight not found.'});
                }
            })
            .catch(err => res.status(500).json({err}));
}

export default { createFreight, getAllFreight, getFreight, updateFreight, deleteFreight };