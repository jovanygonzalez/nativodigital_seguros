"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
class VerificacionTokenController {
    VerificarToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let lRespuesta = false;
            const bearHeader = req.headers['authorization'];
            try {
                const bearer = bearHeader.split(" ");
                const bearerToken = bearer[1];
                const verificar = yield jsonwebtoken_1.verify(bearerToken, 'ñP5nd0r5123456ñ');
                return lRespuesta = true;
            }
            catch (error) {
                // console.log(error.message);
                return lRespuesta = false;
            }
        });
    }
}
exports.VERIFICACIONTOKEN_CONTROLLER = new VerificacionTokenController();
//# sourceMappingURL=VerificacionTokenController.js.map