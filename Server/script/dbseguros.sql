DROP DATABASE IF EXISTS dbseguros;
CREATE DATABASE IF NOT EXISTS dbseguros;
USE dbseguros;
DROP TABLE IF EXISTS tblpolizas;
DROP TABLE IF EXISTS  tblclientes;
DROP TABLE IF EXISTS  tblaseguradoras;
DROP TABLE IF EXISTS tblasegurados;
DROP TABLE IF EXISTS  tblagentes;

CREATE TABLE tblagentes (
	iIdAgente INT PRIMARY KEY AUTO_INCREMENT,
	cNombreCompleto  VARCHAR (50),
	cEmail VARCHAR (50) NOT NULL,
	cContrasena VARCHAR (1000) NOT NULL,
    lActivo TINYINT(4) NULL,
	dtCreacion DATETIME NULL,
	dtModificacion DATETIME NULL
);
CREATE TABLE tblaseguradoras (
	iIdAseguradora INT PRIMARY KEY AUTO_INCREMENT,
	cNombre VARCHAR (50) NOT NULL,
	cTelefono VARCHAR (50),
	lActivo TINYINT(4) NULL,
	dtCreacion DATETIME NULL,
	dtModificacion DATETIME NULL
);
CREATE TABLE tblclientes (
	iIdCliente INT PRIMARY KEY AUTO_INCREMENT,
	cNombreCompleto VARCHAR (50) NOT NULL,
	cTelefono VARCHAR (50) ,
	cEmail VARCHAR (50) ,
	iIdAgente  INT NOT NULL,
	FOREIGN KEY (iIdAgente) REFERENCES tblagentes (iIdAgente),
	iEdad  INT,
	lActivo TINYINT(4) NULL,
	dtCreacion DATETIME NULL,
	dtModificacion DATETIME NULL
);
CREATE TABLE tblpolizas (
	iIdPoliza INT PRIMARY KEY AUTO_INCREMENT,
	iIdAgente  INT,
	FOREIGN KEY (iIdAgente) REFERENCES tblagentes (iIdAgente),
	iIdCliente  INT,
	FOREIGN KEY (iIdCliente) REFERENCES tblclientes (iIdCliente),
	iIdAseguradora  INT ,
	FOREIGN KEY (iIdAseguradora) REFERENCES tblaseguradoras (iIdAseguradora),
	dtFechaInicio DATETIME(3),
	dtFechaVigente DATETIME(3) ,
	cTipo VARCHAR (50) ,
	dPrecio DECIMAL(18,0),
	lEstado TINYINT,
	lActivo TINYINT(4) NULL,
	dtCreacion DATETIME NULL,
	dtModificacion DATETIME NULL
);

CREATE TABLE tblasegurados (
	iIdAsegurado INT PRIMARY KEY AUTO_INCREMENT,
	cNombreCompleto VARCHAR (50),
    iEdad INT,
	iIdPoliza  INT NOT NULL,
	lActivo TINYINT(4) NULL,
	dtCreacion DATETIME NULL,
	dtModificacion DATETIME NULL
);

INSERT INTO tblagentes VALUES(0,'HENRY JOVANY GONZALEZ DZUL', 'jovany0.0gonzalez@gmail.com', 'pass123', 1, now(), now() );
INSERT INTO tblagentes VALUES(0,'ALBERTO MANUEL PECH HUICAB', 'glez8723@gmail.com', 'pass123',1, now(), now() );
INSERT INTO tblagentes VALUES(0,'IRMA JHOVANA SOSA PERAZA', 'perezosa.0gonzalez@gmail.com', 'pass123',1, now(), now() );
INSERT INTO tblagentes VALUES(0,'ADMINISTRADOR', 'admin@gmail.com', '$2b$10$z7DexbOE/LDd6XUFKWzpcufQsa34bO1d5BBcXvQ6Qrx7JgjKhqcN.',1, now(), now() );

INSERT INTO tblaseguradoras VALUES(0,'SEGUROS YUC. S.A.C.V', '9991141565', 1, now(), now() );
INSERT INTO tblaseguradoras VALUES(0,'CAIDAS DE VIDA MÉXICO', '5512565545', 1, now(), now() );
INSERT INTO tblaseguradoras VALUES(0,'SEGURBEST', '5554566', 1, now(), now() );

INSERT INTO tblclientes VALUES(0,'PABLO RAISEL GONGORA', '5554566','RAISELL@GMAIL.COM', 1, 25, 1, now(), now() );
INSERT INTO tblclientes VALUES(0,'GENER MAGAÑA CASTRO', '5554566','GENERMAGAÑA@GMAIL.COM', 2, 65, 1, now(), now() );
INSERT INTO tblclientes VALUES(0,'ALEXIS GONGORA BURGOS', '5554566','ALEXISGONRORA@GMAIL.COM', 3, 84, 1, now(), now() );

INSERT INTO tblpolizas VALUES(0,1,1,1,'2021-12-06', '2022-12-06', 'GASTOS MÉDICOS', 350.00, 1, 1, now(), now() );
INSERT INTO tblpolizas VALUES(0,2,2,2,'2021-05-06', '2022-04-06', 'AUTO', 150.00, 0, 1, now(), now() );
INSERT INTO tblpolizas VALUES(0,3,3,3,'2021-09-06', '2022-03-06', 'SEGURO DE VIDA', 550.00, 1, 1, now(), now() );
INSERT INTO tblpolizas VALUES(0,3,3,3,'2021-09-06', '2022-03-06', 'GASTOS MÉDICOS', 550.00, 0, 1, now(), now() );
INSERT INTO tblpolizas VALUES(0,3,3,3,'2020-11-03', '2021-01-03', 'GASTOS MÉDICOS', 550.00, 0, 1, now(), now() );
INSERT INTO tblpolizas VALUES(0,3,3,3,'2020-06-08', '2021-01-08', 'GASTOS MÉDICOS', 550.00, 0, 1, now(), now() );
INSERT INTO tblpolizas VALUES(0,3,3,3,'2020-03-04', '2021-01-04', 'GASTOS MÉDICOS', 550.00, 0, 1, now(), now() );

INSERT INTO tblasegurados VALUES(0,'JASIVY DIANELLY GONGORA', 20, 1, 1, now(), now() );
INSERT INTO tblasegurados VALUES(0,'IRMA ARACELY VEGA',20, 1, 1, now(), now() );
INSERT INTO tblasegurados VALUES(0,'SARA MALDONADO BAEZA',20, 1, 1, now(), now() );
INSERT INTO tblasegurados VALUES(0,'MARÍA MAGAÑA CASTAÑEDA',20, 2, 1, now(), now() );
INSERT INTO tblasegurados VALUES(0,'JASIVY DIANELLY GONGORA',20, 2, 1, now(), now() );
INSERT INTO tblasegurados VALUES(0,'KAROL BELTRAN BURGOS',20, 3, 1, now(), now() );
INSERT INTO tblasegurados VALUES(0,'MARTHA MAGAÑA GONGORA',20, 3, 1, now(), now() );