import TblAgentes from "../models/tblAgentes";
import { Request, Response } from "express";
import { sequelize } from "../database";
import bcrypt from "bcrypt";

class TblAgentesController {
    public async obtener(req: Request, res: Response) {

        let lstRespuesta = [];

        if (req.query.iIdAgente == null) {
          lstRespuesta = await TblAgentes.findAll();
        } else {
            lstRespuesta = await TblAgentes.findOne({ where: { iIdAgente: req.query.iIdAgente } });
        }
    
        res.json({ data: lstRespuesta });
      }

      public async crear(req: Request, res: Response) {
        try {
                req.body.dtCreacion = Date.now();
                req.body.dtModificacion = Date.now();
                req.body.cContrasena = bcrypt.hashSync(req.body.cContrasena, 10); //contraseña encriptada
  
                const respuesta = await TblAgentes.create(req.body);
                if (respuesta) {
                    return res.json({
                        message: "Registro Insertado con Exito",
                        data: respuesta
                    });
                }
            // }

        } catch (error) {
            res.status(500).json({
                message: 'Ocurrio un error ' + error
            })
        }
    }

    public async editar(req: Request, res: Response) {
        try {
                delete (req.body.dtCreacion);
                req.body.dtModificacion = Date.now();
                const respuesta = await TblAgentes.update(req.body, { where: { iIdAgente: req.body.iIdAgente } });
                if (respuesta) {
                    return res.json({
                        message: "Registro Modificado con Exito",
                        data: req.body
                    });
                }
        } catch (error) {
            res.status(500).json({
                message: 'Ocurrio un error ' + error
            });
        }
    }
    
    public async inactivar(req: Request, res: Response) {
        let transaction;

        try {
                transaction = await sequelize.transaction();

                req.body.dtModificacion = Date.now();
                //*Validacion - itera el objeto y  algun elemento esta inactivado, lo activa y viceversa.
                req.body = req.body.map((item: any) => { item.lActivo = !item.lActivo; return item });
                await TblAgentes.bulkCreate(req.body, { updateOnDuplicate: ['iIdAgente', 'lActivo'] }, { transaction });

                await transaction.commit();
                return res.json({
                    message: "Registro Eliminado con Exito",
                    data: req.body
                });
        } catch (error) {
            if (transaction) await transaction.rollback();
            res.status(500).json({
                message: 'Ocurrio un error ' + error
            });
        }
    }
}

export const TBLAGENTES_CONTROLLER = new TblAgentesController();
