import express from "express";
import controller from '../controllers/Freight';

const router = express.Router();

router.post('/create', controller.createFreight);
router.get('/', controller.getAllFreight);
router.get('/:freightId', controller.getFreight);
router.patch('/update/:freightId', controller.updateFreight);
router.patch('/delete/:freightId', controller.deleteFreight);

export = router;