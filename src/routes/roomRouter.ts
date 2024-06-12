import { Router } from 'express';
import roomController from '../controllers/roomController';
import { endpoints } from '../config/constants';
import authMiddleware from '../middlewares/auth-middleware';
const router = Router();

router.post(endpoints.ROOM.CREATE, authMiddleware, roomController.createRoom);
router.post(endpoints.ROOM.INVITE, authMiddleware, roomController.inviteUserToRoom);
router.post(endpoints.ROOM.LEAVE, authMiddleware, roomController.leaveRoom);
router.delete(endpoints.ROOM.DELETE, authMiddleware, roomController.deleteRoom);
router.get(endpoints.ROOM.GET_ROOMS, authMiddleware, roomController.getRoomsForUser);
export default router;
