import express from "express";
import controller from '../controllers/User';

const router = express.Router();

router.post('/create', controller.createUser);
router.get('/', controller.getAllUser);

export = router;