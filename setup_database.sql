use tempdb;
drop database eval_database;

create database eval_database;

/* 
	Se asume que una persona y solo esa persona es la que administra la aplicación y 
	la base de datos, esta trabaja en una empresa que requiere una aplicación para: 
	gestionar productos, registrar ventas y compras, y ver el historial de
	transacciones

	Por ende, no se administran usuarios ni nada adicional.
*/
use eval_database;

create table productos (
	prod_id			uniqueidentifier PRIMARY KEY DEFAULT NEWID(), 
	prod_nombre		varchar(50) NOT NULL,
	prod_categoria	varchar(50),
	prod_imagen		varchar(50),
	prod_precio		decimal(18,2) NOT NULL,
	prod_stock		int NOT NULL DEFAULT 0,
);

create table transacciones (
	tran_id					uniqueidentifier PRIMARY KEY DEFAULT NEWID(), 
	tran_fecha				date NOT NULL,
	tran_tipo				varchar(50) CHECK (tran_tipo IN ('compra', 'venta')),
	tran_precio_total		decimal(18,2) DEFAULT 0,	
);

create table detalle (
	detalle_id			uniqueidentifier PRIMARY KEY DEFAULT NEWID(),
	tran_id				uniqueidentifier NOT NULL,
	prod_id				uniqueidentifier NOT NULL,
	detalle_cantidad	int NOT NULL,
	constraint fk_detalle_prod foreign key (prod_id)
        references productos(prod_id),
	constraint fk_detalle_tran foreign key (tran_id)
        references transacciones(tran_id)
);


/* Insertar valores */

use eval_database;

insert into productos (prod_id, prod_nombre, prod_categoria, prod_precio, prod_stock) values ('9E311B85-6D24-49C3-A43B-403BF962569D','Coca Cola','Bebidas',3.50, 50);
insert into productos (prod_id, prod_nombre, prod_categoria, prod_precio, prod_stock) values ('72BB1040-01EB-40F5-AAE7-6D22CD8BD484','Limonada','Bebidas',2.50, 50);

insert into transacciones (tran_id,tran_fecha, tran_tipo, tran_precio_total) values ('4AC97712-D564-45FE-8146-219D99078833','2025-06-01','compra',3.50);

insert into detalle (tran_id,prod_id,detalle_cantidad) values ('4AC97712-D564-45FE-8146-219D99078833','9E311B85-6D24-49C3-A43B-403BF962569D',10);
insert into detalle (tran_id,prod_id,detalle_cantidad) values ('4AC97712-D564-45FE-8146-219D99078833','72BB1040-01EB-40F5-AAE7-6D22CD8BD484',10);

/* Crear usuarios y roles  */
use eval_database;
create role permisos_rol;
grant select, insert, update, delete, execute on schema::dbo to permisos_rol;

/* Usuario para modificar microservicio 1 */
create login usersql_productos with password = 'usersql_productos';
create user usersql_productos for login usersql_productos;
alter role permisos_rol ADD MEMBER usersql_productos;

/* Usuario para modificar microservicio 2 */
create login usersql_transacciones with password = 'usersql_transacciones';
create user usersql_transacciones for login usersql_transacciones;
alter role permisos_rol ADD MEMBER usersql_transacciones;


/* Pruebas */

select * from transacciones as T inner join detalle as D on T.tran_id = D.tran_id inner join productos as P on P.prod_id = D.prod_id where T.tran_id='08E430B6-D69F-41CF-9A11-18CB0EE1AAAB';
select * from productos;

select * from transacciones;

select * from transacciones inner join detalle on transacciones.tran_id=detalle.tran_id where transacciones.tran_id='08E430B6-D69F-41CF-9A11-18CB0EE1AAAB';

delete from transacciones  where tran_id <> '4AC97712-D564-45FE-8146-219D99078833';
delete from detalle  where tran_id <> '4AC97712-D564-45FE-8146-219D99078833';