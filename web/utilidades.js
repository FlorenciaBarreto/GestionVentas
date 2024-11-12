const servidor = "http://localhost:3000/";

const urlComercial=servidor+"comercial";
const urlCliente=servidor+"cliente";

function convertToJson(formData){
    let jsonObject={};
    formData.forEach((value,key)=>{
        jsonObject[key]=value;
    });

    console.log(jsonObject);
    return jsonObject;
}




export {urlCliente, urlComercial, convertToJson};            //se exportan sólo los nombres, da igual el argumento