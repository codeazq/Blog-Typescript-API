import { Router, Request, Response, NextFunction } from "express";
import UserController from '../controllers/userController';
import { myContainer } from "../inversify.config";

const router = Router();
const userController: UserController = myContainer.resolve<UserController>(UserController);

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    await userController.index(req, res, next)
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await userController.show(req, res, next)
})

export default router