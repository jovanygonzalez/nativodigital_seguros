import Sequelize from 'sequelize';
import { sequelize } from '../database';
// CREATE TABLE CLIENTES (
// 	ID INT PRIMARY KEY AUTO_INCREMENT,
// 	NOMBRE_COMPLETO VARCHAR (50) NOT NULL,
// 	TELEFONO VARCHAR (50) ,
// 	EMAIL VARCHAR (50) ,
// 	ID_AGENTE  INT NOT NULL,
// 	FOREIGN KEY (ID_AGENTE) REFERENCES AGENTES (ID),
// 	EDAD  INT
// );
const TblClientes = sequelize.define('tblClientes', {
  iIdCliente: {
    type: Sequelize.INTEGER
    , autoIncrement: true
    , primaryKey: true
  },
  cNombreCompleto: {
    type: Sequelize.TEXT
  },
  cTelefono: {
    type: Sequelize.TEXT
  },
  cEmail: {
    type: Sequelize.TEXT
  },
  iEdad: {
    type: Sequelize.INTEGER
  },
  iIdAgente: {
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

export default TblClientes;