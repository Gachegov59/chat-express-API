import { Router } from 'express';
import messageController from '../controllers/messageController';
import authMiddleware from '../middlewares/auth-middleware';
import { endpoints } from '../config/constants';
const router = Router();

router.post(endpoints.MESSAGE.CREATE, authMiddleware, messageController.createMessage);
router.get(endpoints.MESSAGE.ROOM_MESSAGES, authMiddleware, messageController.getMessagesForRoom);


export default router;
