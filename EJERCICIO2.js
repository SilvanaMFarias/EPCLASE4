/*FARIAS SILVANA*/

/*Ejercicio 2 - Insercion y eliminacion de un registro.*/

//Instanciacion de sequelize
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


//Insercion de un usuario
sequelize.sync()
.then(() => Usuarios.create(
    {
    nombres: 'Mario',
    apellidos: 'Bonetti'
    }
    ))
.then(r => {
    console.log(r.toJSON());
});


//Eliminacion de un usuario
sequelize.sync()
.then(() => Usuarios.destroy({
    where: { apellidos: 'Bonetti' }
    }))
.then(() => {
    console.log("Se ha eliminado el registro");
});
