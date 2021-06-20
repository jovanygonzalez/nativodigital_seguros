import TblPolizas from "../models/tblPolizas";
import { Request, Response } from "express";
import { sequelize } from "../database";
import TblAgentes from "../models/tblAgentes";
import TblClientes from "../models/tblClientes";
import TblAseguradoras from "../models/tblAseguradoras";

class TblPolizasController {
    public async obtener(req: Request, res: Response) {
    TblPolizas.belongsTo(TblAgentes, { foreignKey: 'iIdAgente' });
    TblPolizas.belongsTo(TblClientes, { foreignKey: 'iIdCliente' });
    TblPolizas.belongsTo(TblAseguradoras, { foreignKey: 'iIdAseguradora' });

        let lstRespuesta = [];

        if (req.query.iIdPoliza == null) {

            if (req.query.dtFecha != null){
                //select * from tblpolizas where activo = 1 and estado = 0 and tipo = 'GASTOS MÉDICOS' AND FECHA_VIGENTE < '2025-08-04' , 
                const { Op } = require("sequelize");
                let dtFecha = req.query.dtFecha.toString();
                let estado = req.query.lEstado;
                let tipo = req.query.cTipo.toString();
                lstRespuesta = await TblPolizas.findAll({
                    where: {
                        [Op.and]: [
                            { lActivo:  1},
                            { lEstado: estado },
                            { cTipo: tipo },
                            { dtFechaVigente:  {
                                [Op.lt]: dtFecha
                              }
                            }
                        ]
                    }
                });
            
            } else{

                lstRespuesta = await TblPolizas.findAll({  
                    include: 
                    [
                        {
                            model: TblAgentes,
                            where: { lActivo: 1 },
                            required: false
                        },
                        {
                            model: TblClientes,
                            where: { lActivo: 1 },
                            required: false
                        },
                        {
                            model: TblAseguradoras,
                            where: { lActivo: 1 },
                            required: false
                        }         
                    ]
            
                  });
            }

        } else {
            lstRespuesta = await TblPolizas.findOne({ 
                where: { iIdPoliza: req.query.iIdPoliza } ,
                include: 
                [
                    {
                        model: TblAgentes,
                        where: { lActivo: 1 },
                        required: false
                    },
                    {
                        model: TblClientes,
                        where: { lActivo: 1 },
                        required: false
                    },
                    {
                        model: TblAseguradoras,
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
                const respuesta = await TblPolizas.create(req.body);
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
                const respuesta = await TblPolizas.update(req.body, { where: { iIdPoliza: req.body.iIdPoliza } });
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
                await TblPolizas.bulkCreate(req.body, { updateOnDuplicate: ['iIdPoliza', 'lActivo'] }, { transaction });

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

export const TBLPOLIZAS_CONTROLLER = new TblPolizasController();
