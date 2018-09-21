import { Request } from 'express';
import {controller, httpGet, interfaces, request} from "inversify-express-utils";
import {checkJwt} from "../auth/auth.service";
import {inject} from "inversify";
import {UserService} from "../services/user.service";

@controller('/api/login', checkJwt)
export class UserController implements interfaces.Controller {

    constructor(@inject('UserService') private userService: UserService) { }

    @httpGet('/')
    private async authenticateUser(@request() req: Request) {
        const { user: { sub } } = req;
        return await this.userService.authenticateUser(sub);
    }
}