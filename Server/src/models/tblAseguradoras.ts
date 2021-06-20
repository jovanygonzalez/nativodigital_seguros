import Sequelize from 'sequelize';
import { sequelize } from '../database';

const TblAseguradoras = sequelize.define('tblAseguradoras', {
  iIdAseguradora: {
    type: Sequelize.INTEGER
    , autoIncrement: true
    , primaryKey: true
  },
  cNombre: {
    type: Sequelize.TEXT
  },
  cTelefono: {
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
  },
},
  {
    timestamps: false
  });

export default TblAseguradoras;