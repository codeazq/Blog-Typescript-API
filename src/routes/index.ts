import { Router } from 'express';
import userRoutes from './user';
import postRoutes from './post'


export default () => {
    const appRouter = Router()
    appRouter.use('/users', userRoutes);
    appRouter.use('/posts', postRoutes);
    return appRouter
}