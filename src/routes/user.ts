import { Router, Request, Response, NextFunction } from "express";
import { User } from "../entity/User";

const router = Router();

router.get('/', 
async (req: Request, res: Response, next: NextFunction) => {
    const user = new User();
    user.userName = "Timber";
    user.isActive = true;
    await user.save();
    res.send(user);
})

export default router