import express from "express";
import controller from '../controllers/RemovedFreight';

const router = express.Router();

router.get('/', controller.getRemovedFreight);

export = router;