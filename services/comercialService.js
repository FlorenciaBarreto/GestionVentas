const db = require('./db');
const helper = require('../helper');

//Get para la lista completa de registros
async function getComercialFullList() {
    let sql = "SELECT * FROM comercial;";
    
    console.debug("La consulta en SQL es: " + sql);
    const rows = await db.query(sql);
    const info = helper.emptyOrRows(rows);
    return{info};
}

//Get comercial por id
async function getOneComercial(id){
    let sql = "SELECT * FROM comercial WHERE id="+id+";";
    
    console.debug("La consulta en SQL es: " + sql);
    const rows = await db.query(sql);
    const info = helper.emptyOrRows(rows);
    return{info};
}


//Crear nuevo comercial
async function createNewComercial(comercial){
    let sql = "INSERT INTO comercial (nombre, apellido1, apellido2, comision) VALUES (";
    sql += "'" + comercial.nombre + "', '" + comercial.apellido1 + "', '" + comercial.apellido2 + "', '" + comercial.comision + "');";
        
    console.debug("La consulta en SQL es: " + sql);
    const rows = await db.query(sql);
    const info = helper.emptyOrRows(rows);
    return{info};
}


//cambiar nombres de las funciones
module.exports = {
    getComercialFullList,
    getOneComercial,
    createNewComercial

   
  }