const db = require('./db');
const helper = require('../helper');

//Get para la lista completa de registros
async function getPedidosFullList() {
  let sql = "SELECT * FROM pedido;";
  
  console.debug("La consulta en SQL es: " + sql);
  const rows = await db.query(sql);
  const info = helper.emptyOrRows(rows);
  return{info};
}

//Get pedido por id
async function getPedidoPorId(id){
  let sql = "SELECT * FROM pedido WHERE id="+id+";";
  
  console.debug("La consulta en SQL es: " + sql);
  const rows = await db.query(sql);
  const info = helper.emptyOrRows(rows);
  return{info};
}


//Get pedido por id del cliente
async function getPedidoPorIdDelCliente(id_cliente){
  let sql = "SELECT * FROM pedido WHERE id_cliente=" + id_cliente + ";";
  
  console.debug("La consulta en SQL es: " + sql);
  const rows = await db.query(sql);
  const info = helper.emptyOrRows(rows);
  return{info};
}


//Get pedido por id del comercial
async function getPedidoPorIdDelComercial(id_comercial){
  let sql = "SELECT * FROM pedido WHERE id_cliente=" + id_comercial + ";";
  
  console.debug("La consulta en SQL es: " + sql);
  const rows = await db.query(sql);
  const info = helper.emptyOrRows(rows);
  return{info};
}


//Crear nuevo Pedido
async function createNewPedido(pedido){
  let sql = "INSERT INTO comercial (total, fecha, id_cliente, id_comercial) VALUES (";
  sql += "'" + pedido.total + "', '" + pedido.fecha + "', '" + pedido.id_cliente + "', '" + pedido.id_comercial + "');";
      
  console.debug("La consulta en SQL es: " + sql);
  const rows = await db.query(sql);
  const info = helper.emptyOrRows(rows);
  return{info};
}


//Modificar Pedido
async function modifyPedido(pedido) {
  let sql = "UPDATE pedido SET total='" + pedido.total + "', fecha='" + pedido.fecha + "', id_cliente='" + pedido.id_cliente + "', id_comercial='" + pedido.id_comercial + "' WHERE id=" + pedido.id + ";";

  console.debug("La consulta en SQL es: " + sql);
  const rows = await db.query(sql);
  const info = helper.emptyOrRows(rows);
  return{info};
}


//Borrar Pedido Por Id
async function deletePedido(id) {
  let sql = "DELETE FROM pedido WHERE id='"+ id +"';"

  console.debug("La consulta en SQL es: " + sql);
  const rows = await db.query(sql);
  const info = helper.emptyOrRows(rows);
  return{info};
}





//cambiar nombres de las funciones
module.exports = {
    getPedidosFullList,
    getPedidoPorId,
    getPedidoPorIdDelCliente,
    getPedidoPorIdDelComercial,
    createNewPedido,
    modifyPedido,
    deletePedido   
  }