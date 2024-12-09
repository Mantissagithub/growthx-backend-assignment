import {Router} from "express";
import { registerAdmin, adminLogin, getAdmins, updateAdminProfile, getAssignnments, updateAssignmentStatus, acceptAssignment, rejectAssignment, completeAssignment, markAssignmentPending } from "../controllers/admin.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post('/register', registerAdmin);
router.post('/login', adminLogin);
router.post('/all', authMiddleware['admin'], getAdmins);
router.post('/profile', authMiddleware['admin'], updateAdminProfile);
router.post('/assignments', authMiddleware['admin'], getAssignnments);
router.post('/assignments/:id/accept', authMiddleware['admin'], acceptAssignment);
router.post('/assignments/:id/reject', authMiddleware['admin'], rejectAssignment);
router.post('/assignments/:id/complete', authMiddleware['admin'], completeAssignment);
router.post('/assignments/:id/pending', authMiddleware['admin'], markAssignmentPending);

export default router;