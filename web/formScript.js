window.onload = function(){
    let formulario = document.getElementById("formulario");

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
    console.log(datos.get("nombre"));   //usa los name del input
    console.log(datos.get("apellido1"));
    console.log(datos.get("apellido2"));
    console.log(datos.get("comision"));

    let nombre=datos.get("nombre");
    let apellido1=datos.get("apellido1");
    let apellido2=datos.get("apellido2");
    let comision=datos.get("comision");

    let jsonDatos={
        nombre: nombre,
        apellido1: apellido1,
        apellido2: apellido2,
        comision: comision
    }


    console.log("values: " + datos.values);


    fetch(url, 'POST', {body: jsonDatos}).then(
        response=>{
            console.log(response);
            return response.json
        }
    ).then(
        data=>{
            console.log(data);
            alert("todo ok");
        }
    ).catch(error=>{
        console.error("error en crear comercial: " + error);
        errorElement.textContent = "Error creating comercial " + error.message;
    })
}