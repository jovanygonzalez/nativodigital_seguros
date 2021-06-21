import TblAseguradoras from "../models/tblAseguradoras";
import { Request, Response } from "express";
import { sequelize } from "../database";

class TblAseguradorasController {
    public async obtener(req: Request, res: Response) {
        let lstRespuesta = [];

        if (req.query.iIdAseguradora == null) {
          lstRespuesta = await TblAseguradoras.findAll();
        } else {
            lstRespuesta = await TblAseguradoras.findOne({ where: { iIdAseguradora: req.query.iIdAseguradora } });
        }
        res.json({ data: lstRespuesta });
      }

      public async crear(req: Request, res: Response) {
        try {
                req.body.dtCreacion = Date.now();
                req.body.dtModificacion = Date.now();
                const respuesta = await TblAseguradoras.create(req.body);
                if (respuesta) {
                    return res.json({
                        message: "Registro Insertado con Exito",
                        data: respuesta
                    });
                }

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
                const respuesta = await TblAseguradoras.update(req.body, { where: { iIdAseguradora: req.body.iIdAseguradora } });
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
                await TblAseguradoras.bulkCreate(req.body, { updateOnDuplicate: ['iIdAseguradora', 'lActivo'] }, { transaction });

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

export const TBLASEGURADORAS_CONTROLLER = new TblAseguradorasController();
