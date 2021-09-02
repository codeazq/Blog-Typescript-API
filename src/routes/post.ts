import {Router, Request, Response, NextFunction} from 'express'
import PostController from '../controllers/postController';
import { myContainer } from "../inversify.config";
import passport from "passport";
import * as passportConfig from "../config/passport";

const router = Router();
const postController: PostController = myContainer.resolve<PostController>(PostController);

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    await postController.index(req, res, next)
})

router.post('/', passport.authenticate('jwt',{session: false}),  async (req: Request, res: Response, next: NextFunction) => {
    await postController.store(req, res, next)
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await postController.show(req, res, next)
})

router.put('/:id', passport.authenticate('jwt',{session: false}), async (req: Request, res: Response, next: NextFunction) => {
    await postController.update(req, res, next)
})

router.delete('/:id', passport.authenticate('jwt',{session: false}), async (req: Request, res: Response, next: NextFunction) => {
    await postController.delete(req, res, next)
})

export default router