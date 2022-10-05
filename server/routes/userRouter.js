import { Router } from 'express';
import {
  getUsers,
  login,
  register,
  updateStatus,
} from '../controllers/user.js';

const userRouter = Router();
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/', getUsers);
userRouter.patch('/updateStatus/:userId', updateStatus);

export default userRouter;
