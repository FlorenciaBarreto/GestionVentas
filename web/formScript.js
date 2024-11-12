import { urlComercial, convertToJson } from "./utilidades.js";
//para importar todo:
//import * as util from "./utilidades.js"; 
//y luego hago tipo util.convertToJson

let formulario;

window.onload = function(){
    formulario = document.getElementById("formulario");

    formulario.addEventListener("submit", function(e){
    alert("Le diste a submit");
    e.preventDefault();
    createComercial();
})
}


function createComercial(){
    alert("estás en el formScript");
    const url= "http://localhost:3000/comercial";

    let datos = new FormData(formulario);
    console.log(datos)
    console.log(datos.get("nombre"));                      //usa los name del input dentro del get
    console.log(datos.get("apellido1"));
    console.log(datos.get("apellido2"));
    console.log(datos.get("comision"));


    let jsonForm = convertToJson(datos);   


    fetch(urlComercial, {method:'POST', body: JSON.stringify(jsonForm), headers: {'Content-Type': 'application/json'}})
    .then(
        response=>{
            console.log(response);
            return response.json();               //este .json siempre agarra el json que viene dentro del body
        }
    ).then(
        data=>{
            console.log(data);
            alert("Comercial creado con id:" + data.info[0].id);
            const resultados = document.getElementById("comercialCreado");
            resultados.textContent = JSON.stringify(data.info[0]);
        }
    ).catch(error=>{
        console.error("error en crear comercial: " + error);
        const errorElement = document.getElementById("error");
        errorElement.textContent = "Error creating comercial " + error.message;
    })

    formulario.reset();
}

