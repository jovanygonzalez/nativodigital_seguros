import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import TblAgentes from "../models/tblAgentes";
class LoginController {

    /// <summary>METODO QUE SE ENCARGAR DE VALIDAR EN EL LOGIN SI EL USUARIO EXISTE
    /// <param>req</param> variable que contiene los parametros enviados al metodo
    /// <param>res</param> variable que contiene los tipos de respuestas que puede de devolver el metodo
    /// <return>Devuelve un arreglo de tipo json con objetos del tipo Usuarios</return>
    /// </summary>
    public async LoginUser(req: Request, res: Response) {
        const SECRET_KEY = 'ñP5nd0r5123456ñ';

        const lstRespuesta = await TblAgentes.findAll(
            {
                where: { lActivo: 1,  cEmail: req.body.cEmail }
            });
            let datos = lstRespuesta.filter((item: any) => (item != null) ? item : null);

        if (datos == 0) {
            res.json({ error: 'Correo no válido' });
        } else {
            let cContrasena =  datos[0].dataValues.cContrasena;
            let cNombreCompleto = datos[0].dataValues.cNombreCompleto;
            let cEmail =  datos[0].dataValues.cEmail;

            const pass = bcrypt.compareSync(req.body.cContrasena, cContrasena);
            if (pass) {
                const expiresIn = 36000000; //milisegundos (10 hrs)
                const accessToken = sign({ id: datos[0].dataValues.iIdAgente }, SECRET_KEY, { expiresIn: '10h' });

                const dataUser = {
                    iIdAgente: datos[0].dataValues.iIdAgente,
                    cNombreCompleto: cNombreCompleto,
                    cEmail: cEmail,
                    cToken: accessToken,
                    cExpiraEn: expiresIn
                }
                res.json(dataUser);
            }
            else {
                res.json({ error: 'Contraseña no válida' });
            }
        }
    }
}

export const LOGIN_CONTROLLER = new LoginController();