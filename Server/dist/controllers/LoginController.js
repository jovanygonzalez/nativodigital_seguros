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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = require("jsonwebtoken");
const tblAgentes_1 = __importDefault(require("../models/tblAgentes"));
class LoginController {
    /// <summary>METODO QUE SE ENCARGAR DE VALIDAR EN EL LOGIN SI EL USUARIO EXISTE
    /// <param>req</param> variable que contiene los parametros enviados al metodo
    /// <param>res</param> variable que contiene los tipos de respuestas que puede de devolver el metodo
    /// <return>Devuelve un arreglo de tipo json con objetos del tipo Usuarios</return>
    /// </summary>
    /// </summary>
    /// </summary>
    /// </summary>
    /// </summary>
    LoginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const SECRET_KEY = 'ñP5nd0r5123456ñ';
            const lstRespuesta = yield tblAgentes_1.default.findAll({
                where: { lActivo: 1, cEmail: req.body.cEmail }
            });
            let datos = lstRespuesta.filter((item) => (item != null) ? item : null);
            if (datos == 0) {
                res.json({ error: 'Correo no válido' });
            }
            else {
                let cContrasena = datos[0].dataValues.cContrasena;
                let cNombreCompleto = datos[0].dataValues.cNombreCompleto;
                let cEmail = datos[0].dataValues.cEmail;
                const pass = bcrypt_1.default.compareSync(req.body.cContrasena, cContrasena);
                if (pass) {
                    const expiresIn = 36000000; //milisegundos (10 hrs)
                    const accessToken = jsonwebtoken_1.sign({ id: datos[0].dataValues.iIdAgente }, SECRET_KEY, { expiresIn: '10h' });
                    const dataUser = {
                        iIdAgente: datos[0].dataValues.iIdAgente,
                        cNombreCompleto: cNombreCompleto,
                        cEmail: cEmail,
                        cToken: accessToken,
                        cExpiraEn: expiresIn
                    };
                    res.json(dataUser);
                }
                else {
                    res.json({ error: 'Contraseña no válida' });
                }
            }
        });
    }
}
exports.LOGIN_CONTROLLER = new LoginController();
//# sourceMappingURL=LoginController.js.map