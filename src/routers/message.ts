import { Router } from "express";
import * as controller from "../controllers/message";

const router = Router({ mergeParams: true });

router.get('/');
router.post('/send', controller.send);

export default router;