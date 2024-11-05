function buscar(){
    alert("hola");
    
    const arrayData=[
        {id: 1, nombre: "aaa", apellido1:"bbb", apellido2: "fff", comision: 0.1}, 
        {id: 2, nombre: "hafaaa", apellido1:"bbfahb", apellido2: "fffsadf", comision: 0.1},
        {id: 3, nombre: "aajfsa", apellido1:"bbadfhb", apellido2: "fhafff", comision: 0.1}
    ]

    rellenarTabla(arrayData);
}

function rellenarTabla(data){    //data es un array de datos que hay que pintar
    let table = document.getElementById("resultados");
    table.innerHTML="";

    let out="";
    for(let item of data){
        out += "<tr>";

        out += "<td>" + item.id + "</td>";
        out += "<td>" + item.nombre + "</td>";
        out += "<td>" + item.apellido1 + "</td>";
        out += "<td>" + item.apellido2 + "</td>";
        out += "<td>" + item.comision + "</td>";

        out += "</tr>"
    }

    table.innerHTML=out;
}