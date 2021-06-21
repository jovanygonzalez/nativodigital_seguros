"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LoginController_1 = require("../controllers/LoginController");
class LoginRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', LoginController_1.LOGIN_CONTROLLER.LoginUser);
    }
}
exports.loginRoutes = new LoginRoutes();
//# sourceMappingURL=loginRoutes.js.map