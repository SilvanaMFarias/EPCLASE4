/*FARIAS SILVANA*/

/*Ejercicio 3 - Insercion y actualizacion de varios registros.*/

const Sequelize = require('sequelize');

//Conexion a la base de datos
const sequelize = new Sequelize('epclase4', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

//Conexion a la BD y comprobacion de la misma
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


//Definicion del modelo usuario
class Usuarios extends Sequelize.Model {}
Usuarios.init({
  nombres: {
    type: Sequelize.STRING,
  },
  apellidos: {
    type: Sequelize.STRING
  }
}, 
{ sequelize, modelName: 'usuarios' });

//Borro el contenido de la tabla y reinicio la propiedad identity del id
sequelize.sync()
.then(() => Usuarios.destroy({ truncate: true, restartIdentity: true }))

//Insercion de varios usuarios
sequelize.sync()
.then(() => Usuarios.bulkCreate(
    [
        {nombres: 'Andrea', apellidos: 'Del Boca'},
        {nombres: 'Mariano', apellidos: 'Martinez'},
        {nombres: 'Felipe Isidro', apellidos: 'Pigna'},
        {nombres: 'Roberto', apellidos: 'Fontanarrosa'},
        {nombres: 'Luis', apellidos: 'Zamora'}
    ]
    ))
.then(() => {
    console.log("Usuarios insertados")
});


//Actualizacion de varios usuarios
const { Op } = require("sequelize");
sequelize.sync()
.then(() => Usuarios.update(
    { apellidos: "Taravella" }, 
    { where: 
        {
        id: {[Op.between]: [2, 4] }
        }
    }
))
.then(() => {
    console.log("Se han modificado registros");
});

