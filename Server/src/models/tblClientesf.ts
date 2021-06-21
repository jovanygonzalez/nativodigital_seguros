import Sequelize from 'sequelize';
import { sequelize } from '../database';

const TblClientes = sequelize.define('tblClientes', {
  iIdCliente: {
    type: Sequelize.INTEGER
    , autoIncrement: true
    , primaryKey: true
  },
  iIdPadron: {
    type: Sequelize.INTEGER


  },
  cUsuario: {
    type: Sequelize.TEXT


  },
  cCorreoElectronico: {
    type: Sequelize.TEXT


  },
  cContrasena: {
    type: Sequelize.TEXT


  },
  lActivo: {
    type: Sequelize.INTEGER


  },
  lesCliente: {
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

export default TblClientes;