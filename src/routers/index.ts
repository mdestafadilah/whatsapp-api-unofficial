import { Router } from "express";
import messageRoutes from "./message";

const router  = Router();

router.use('/:sessionId/messages', messageRoutes);

export default router;