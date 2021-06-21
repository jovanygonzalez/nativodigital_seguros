import Sequelize from 'sequelize';
import { sequelize } from '../database';

const TblAgentes = sequelize.define('tblAgentes', {
  iIdAgente: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  cNombreCompleto: {
    type: Sequelize.TEXT
  },
  cEmail: {
    type: Sequelize.TEXT
  },
  cContrasena: {
    type: Sequelize.TEXT
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

export default TblAgentes;