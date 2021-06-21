import Sequelize from 'sequelize';
import { sequelize } from '../database';

const TblPolizas = sequelize.define('tblPolizas', {
  iIdPoliza: {
    type: Sequelize.INTEGER
    , autoIncrement: true
    , primaryKey: true
  },
  iIdAgente: {
    type: Sequelize.INTEGER
  },
  iIdCliente: {
    type: Sequelize.INTEGER
  },
  iIdAseguradora: {
    type: Sequelize.INTEGER
  },
  dtFechaInicio: {
    type: Sequelize.DATE
  },
  dtFechaVigente: {
    type: Sequelize.DATE
  },
  cTipo: {
    type: Sequelize.INTEGER
  },
  dPrecio: {
    type: Sequelize.DOUBLE
  },
  lEstado: {
    type: Sequelize.INTEGER
  },
  lActivo: {
    type: Sequelize.INTEGER
  },
  dtCreacion: {
    type: Sequelize.DATE
  },
  dtModificacion: {
    type: Sequelize.DATE
  },
},
  {
    timestamps: false
  });

export default TblPolizas;