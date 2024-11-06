const db = require('./db');
const helper = require('../helper');

//Get Full Clients list
async function getClientsList() {
  let sql ="SELECT * FROM cliente;";

  console.debug("La consulta en SQL es: " + sql);
  const rows = await db.query(sql);
  const info = helper.emptyOrRows(rows);
  return{info};
}


//Get Clientes por id
async function getOneClient(id){
  let sql = "SELECT * FROM cliente WHERE id="+id+";";
  
  console.debug("La consulta en SQL es: " + sql);
  const rows = await db.query(sql);
  const info = helper.emptyOrRows(rows);
  return{info};
}


//Crear nuevo cliente
async function createNewClient(cliente){
  let sql = "INSERT INTO cliente (nombre, apellido1, apellido2, ciudad, categoria) VALUES (";
  sql += "'" + cliente.nombre + "', '" + cliente.apellido1 + "', '" + cliente.apellido2 + "', '" + cliente.ciudad + "', '" + cliente.categoria + "');";
      
  console.debug("La consulta en SQL es: " + sql);
  const rows = await db.query(sql);
  const info = helper.emptyOrRows(rows);
  return{info};
}

//Borrar Cliente
async function deleteClient(id) {
  let sql = "DELETE FROM cliente WHERE id='"+ id +"';"

  console.debug("La consulta en SQL es: " + sql);
  const rows = await db.query(sql);
  const info = helper.emptyOrRows(rows);
  return{info};
}


//Modificar Comercial
async function modifyClient(cliente) {
  let sql = "UPDATE cliente SET nombre='" + cliente.nombre + "', apellido1='" + cliente.apellido1 + "', apellido2='" + cliente.apellido2 + "', ciudad='" + cliente.ciudad + "', categoria='" + cliente.categoria + "' WHERE id=" + cliente.id + ";";

  console.debug("La consulta en SQL es: " + sql);
  const rows = await db.query(sql);
  const info = helper.emptyOrRows(rows);
  return{info};
}


//cambiar nombres de las funciones
module.exports = {
    getClientsList,
    getOneClient,
    createNewClient,
    deleteClient,
    modifyClient       
  }