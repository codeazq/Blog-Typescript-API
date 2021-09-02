import {Router, Request, Response, NextFunction} from 'express'
import AuthController from '../controllers/authController';
import { myContainer } from "../inversify.config";
import passport from "passport";
import * as passportConfig from "../config/passport";

const router = Router();
const authController: AuthController = myContainer.resolve<AuthController>(AuthController);

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    await authController.register(req, res, next)
})

router.post('/sign_in', async (req: Request, res: Response, next: NextFunction) => {
    await authController.signIn(req, res, next)
})

router.post('/deactivate', passport.authenticate('jwt',{session: false}), async (req: Request, res: Response, next: NextFunction) => {
    await authController.deactivate(req, res, next)
})

export default router