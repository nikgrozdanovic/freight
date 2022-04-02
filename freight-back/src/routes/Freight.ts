import express from "express";
import controller from '../controllers/Freight';

const router = express.Router();

router.post('/create', controller.createFreight);

export = router;