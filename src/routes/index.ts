import { Router } from 'express';
import userRoutes from './user';
import postRoutes from './post';
import authRoutes from './auth';


export default () => {
    const appRouter = Router()
    appRouter.use('/users', userRoutes);
    appRouter.use('/posts', postRoutes);
    appRouter.use('/auth', authRoutes);
    return appRouter
}