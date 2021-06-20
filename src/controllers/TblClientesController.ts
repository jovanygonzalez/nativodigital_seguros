import TblClientes from "../models/tblClientes";
import TblAgentes from "../models/tblAgentes";
import { Request, Response } from "express";
import { sequelize } from "../database";

class TblClientesController {
    public async obtener(req: Request, res: Response) {
        TblClientes.belongsTo(TblAgentes, { foreignKey: 'iIdAgente' });

        let lstRespuesta = [];

        if (req.query.iIdCliente == null) {
          lstRespuesta = await TblClientes.findAll({
            include: [
                {
                    model: TblAgentes,
                    where: { lActivo: 1 },
                    required: false
                }       
            ]
        });
        } else {
            lstRespuesta = await TblClientes.findOne({ 
                include: [
                    {
                        model: TblAgentes,
                        where: { lActivo: 1 },
                        required: false
                    }
                ],
                where: { 
                    iIdCliente: req.query.iIdCliente
                }

            });
        }

        res.json({ data: lstRespuesta });
      }

      public async crear(req: Request, res: Response) {
        try {
                req.body.dtCreacion = Date.now();
                req.body.dtModificacion = Date.now();
                const respuesta = await TblClientes.create(req.body);
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
                const respuesta = await TblClientes.update(req.body, { where: { iIdCliente: req.body.iIdCliente } });
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
                await TblClientes.bulkCreate(req.body, { updateOnDuplicate: ['iIdCliente', 'lActivo'] }, { transaction });

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

export const TBLCLIENTES_CONTROLLER = new TblClientesController();
