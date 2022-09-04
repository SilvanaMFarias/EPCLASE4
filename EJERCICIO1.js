/*FARIAS SILVANA*/

/*Ejercicio 1 - Insercion y actualizacion de un registro*/

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
  .then(() => Usuarios.create({
    nombres: 'Silvana',
    apellidos: 'Farias'
  }))
  .then(r => {
    console.log(r.toJSON());
  });

//Actualizacion del usuario creado
sequelize.sync()
  .then(() =>
    Usuarios.update(
      {nombres: "Silvana Marcela"}, 
      {where: { apellidos: 'Farias' }}
  ))
  .then(() => {
    console.log("Se ha actualizado el registro");
  });
  
