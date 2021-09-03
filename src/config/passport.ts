import * as passport from "passport";
import * as passportJWT from "passport-jwt";
import { myContainer } from "../inversify.config";
import { TYPES } from "../types";
import IUserRepositoryInterface from "../repositories/interfaces/userInterface";

const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const userRepo: IUserRepositoryInterface = myContainer.get<IUserRepositoryInterface>(TYPES.IUserRepositoryInterface);

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : process.env.passportSecret || 'x?@$xqXVZp?7P#PG'
},
    function (jwtPayload, done) {
        console.log("token passport: ", jwtPayload);
        userRepo.find(jwtPayload.sub)
            .then(user => {
                done(null, user);
            })
            .catch(error => {
                done(error, null);
            })
    }
))