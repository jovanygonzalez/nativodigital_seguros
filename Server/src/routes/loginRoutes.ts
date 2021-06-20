import {Router} from 'express';
import {LOGIN_CONTROLLER} from '../controllers/LoginController';

class LoginRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }
 
    config():void {
        this.router.post('/',LOGIN_CONTROLLER.LoginUser);
    }
}

export const loginRoutes = new LoginRoutes();