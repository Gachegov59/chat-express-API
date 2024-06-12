import { Router } from 'express';
import userController from '../controllers/userController';
import { endpoints } from '../config/constants';
import authMiddleware from '../middlewares/auth-middleware';
const router = Router();

router.post(endpoints.USER.REGISTERATION, userController.registerationUser)
router.get(endpoints.USER.ACTIVATE_LINK, userController.activateUser)

router.post(endpoints.USER.LOGIN, userController.loginUser)
router.post(endpoints.USER.LOGOUT, userController.logoutUser)
router.get(endpoints.USER.REFRESH, userController.refreshTokenUser)

router.get(endpoints.USER.USERS, authMiddleware, userController.getUsers);
// router.get('/:id', userController.getUserById);

export default router;
