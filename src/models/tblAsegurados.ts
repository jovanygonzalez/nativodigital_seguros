import Sequelize from 'sequelize';
import { sequelize } from '../database';

const TblAsegurados = sequelize.define('tblAsegurados', {

  iIdAsegurado: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cNombreCompleto: {
    type: Sequelize.TEXT
  },
  iIdPoliza: {
    type: Sequelize.INTEGER
  },
  iEdad: {
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
  }
},
  {
    timestamps: false
  });

export default TblAsegurados;