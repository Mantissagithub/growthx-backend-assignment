import {Router} from "express";
import { userRegister, userLogin, uploadAssignment, getAdmins, getCurrentUser, updateUser, deleteUser } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/upload', authMiddleware['user'], uploadAssignment);
router.post('/admins', authMiddleware['user'], getAdmins);
router.post('/me', authMiddleware['user'], getCurrentUser);
router.post('/update', authMiddleware['user'], updateUser);
router.post('/delete', authMiddleware['user'], deleteUser);

export default router;
