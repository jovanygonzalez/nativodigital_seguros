import TblAsegurados from "../models/tblAsegurados";
import { Request, Response } from "express";
import { sequelize } from "../database";
import TblPolizas from "../models/tblPolizas";

class TblAseguradosController {
    public async obtener(req: Request, res: Response) {
        TblAsegurados.belongsTo(TblPolizas, { foreignKey: 'iIdPoliza' });

        let lstRespuesta = [];

        if (req.query.iIdPoliza == null) {
            lstRespuesta = await TblAsegurados.findAll({ 
                where: { lActivo:  1 } ,
                include: [
                    {
                        model: TblPolizas,
                        where: { lActivo: 1 },
                        required: false
                    }       
                ]
            
            });
        } else {
            lstRespuesta = await TblAsegurados.findAll({ 
                where: { iIdPoliza:  req.query.iIdPoliza } ,
                include: [
                    {
                        model: TblPolizas,
                        where: { lActivo: 1 },
                        required: false
                    }       
                ]
            });
        }
        res.json({ data: lstRespuesta });
      }

      public async crear(req: Request, res: Response) {
        try {
                req.body.dtCreacion = Date.now();
                req.body.dtModificacion = Date.now();
                const respuesta = await TblAsegurados.create(req.body);
                    return res.json({
                        message: "Registro Insertado con Exito",
                        data: respuesta
                    });
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
                const respuesta = await TblAsegurados.update(req.body, { where: { iIdAsegurado: req.body.iIdAsegurado } });
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
                await TblAsegurados.bulkCreate(req.body, { updateOnDuplicate: ['iIdAsegurado', 'lActivo'] }, { transaction });

                await transaction.commit();
                return res.json({
                    message: "Registro Eliminado con Exito",
                    data: req.body
                });
            // }
        } catch (error) {
            if (transaction) await transaction.rollback();
            res.status(500).json({
                message: 'Ocurrio un error ' + error
            });
        }
    }
}

export const TBLASEGURADOS_CONTROLLER = new TblAseguradosController();
