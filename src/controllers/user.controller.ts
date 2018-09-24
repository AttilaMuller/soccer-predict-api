import { Request, Response } from 'express';
import {controller, httpGet, interfaces, request, response} from "inversify-express-utils";
import {checkJwt} from "../auth/auth.service";
import {inject} from "inversify";
import {UserService} from "../services/user.service";

@controller('/api/login', checkJwt)
export class UserController implements interfaces.Controller {

    constructor(@inject('UserService') private userService: UserService) { }

    @httpGet('/')
    private async authenticateUser(@request() req: Request, @response() resp: Response){
        const { user: { sub } } = req;
        try {
            resp.status(200);
            return await this.userService.authenticateUser(sub);
        } catch (error) {
            resp.status(400);
            return error.message;
        }
    }
}