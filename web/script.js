

function buscar(){    
    const errorElement = document.getElementById("error");

    //creamos la url del servicio
    const url= "http://localhost:3000/comercial";
    fetch(url, {method:'GET'}).then(  //en este then recibo la resp del sv y la guardo en la variable response. La info de la respuesta la podemos gestionar y recuperar y enviar el json que nos ha llegado
        response => { 
            console.log(response);
            return response.json();
        }
    ).then(  //recibimos el return del then anterior, que es el json que nos ha devuelto el sv. Este json lo guarda en data y en la funcion trabajamos sus datos
        data=>{
            console.log(data);
            const arrayComercial = data.info;
            rellenarTabla(arrayComercial);


            errorElement.textContent="Hemos recuperado el json";
        }
    ).catch(error=>{
        console.error("error en catch: " + error);
        errorElement.textContent = "Error fetchin data " + error.message;
    })

   
}

function rellenarTabla(data){    //data es un array de datos que hay que pintar
    let table = document.getElementById("resultados");
    table.innerHTML="";

    let out="";
    for(let item of data){
        out += "<tr>";

        for (let value of Object.values(item)){
            out += "<td>" + value + "</td>";
        }      

        out += "</tr>"
    }

    table.innerHTML=out;
}

function buscarId(){
    const errorElement = document.getElementById("error");
    
    let url= "http://localhost:3000/comercial/";
    let idIngresado = document.getElementById("identificador");
    url+=idIngresado.value;
    alert(url);

    fetch(url, {method: 'GET'}).then(
        response =>response.json()        
    ).then(
        data=>{
            console.log(data);            
            
            let id_comercial=document.getElementById("id_comercial");
            let nombre=document.getElementById("nombre");
            let apellido1=document.getElementById("apellido1");
            let apellido2=document.getElementById("apellido2");
            let comision=document.getElementById("comision");
            let lgnd1=document.getElementById("legend1");

            id_comercial.value=data.info[0].id;
            nombre.value=data.info[0].nombre;
            apellido1.value=data.info[0].apellido1;
            apellido2.value=data.info[0].apellido2;
            comision.value=data.info[0].comision;
            lgnd1.innerText=data.msg;

            errorElement.textContent="Hemos recuperado el json";
        }
    ).catch(error=>{
        console.error("error en comercial: " + error);
        errorElement.textContent = "Error fetchin comercial data " + error.message;
    })







}