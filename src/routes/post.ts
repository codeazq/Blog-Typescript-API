import {Router, Request, Response, NextFunction} from 'express'
import PostController from '../controllers/postController';
import { myContainer } from "../inversify.config";

const router = Router();
const postController: PostController = myContainer.resolve<PostController>(PostController);

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    await postController.index(req, res, next)
})

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    await postController.store(req, res, next)
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await postController.show(req, res, next)
})

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await postController.update(req, res, next)
})

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await postController.delete(req, res, next)
})

export default router