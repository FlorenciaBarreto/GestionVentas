const express = require("express");
const router = express.Router();

const clienteService = require("../services/clienteService");


//GET FULL LIST
router.get("/", async function(req, res){     
    let code, msg;    
    try{
        const fullList = await clienteService.getClientsList();
        let info=fullList.info;
        code=200;
        msg="Listado de clientes encontrados: ";
        res.status(200).json({code, msg, info})
    } catch(err){
        code=501;
        msg="Error en la base de datos";
        res.status(501).json({code, msg});
    }    
});


//GET POR ID 
router.get("/:id", async function(req, res) {
    let code, msg;
    const id = req.params.id;
    try{
        const findedClient = await clienteService.getOneClient(id);
        let info = findedClient.info;
        if(findedClient.info.length>0){            
            code=200;
            msg="Cliente con id " + id + " encontrado:";
            res.status(200).json({code, msg, info});
        } else {
            code=404;
            msg="No se han encontrado clientes con el id: " + id;
            res.status(404).json({code, msg});
        }
    } catch(err){
        code=501;
        msg="Error en la base de datos";
        res.status(501).json({code, msg});
        console.error("error bd ", err.message);
    }
});


//MODIFICAR UN CLIENTE
router.put("/:id", async function(req,res){
    const id=req.params.id;
    const{nombre, apellido1, apellido2, ciudad, categoria}=req.body;
    let code, msg;

    try{
        let findedClient = await clienteService.getOneClient(id);
        if(findedClient.info.length>0){
            let updatedInfo=findedClient.info[0];
            if(nombre){
                updatedInfo.nombre=nombre;
            }
            if(apellido1){
                updatedInfo.apellido1=apellido1;
            }
            if(apellido2){
                updatedInfo.apellido2=apellido2;
            }
            if(ciudad){
                updatedInfo.ciudad=ciudad;
            }
            if(categoria){
                updatedInfo.categoria=categoria;
            }

            let updatedClient = await clienteService.modifyClient(updatedInfo);
            if(updatedClient.info.changedRows>0){
                code=200;
                msg="El cliente ha sido modificado con éxito.";
                res.status(200).json({code,msg,updatedInfo});
            } else {
                code=401;
                msg="No se ha podido modificar el cliente.";
                res.status(401).json({code, msg});
            }
        } else {
            code=404;
            msg="No se han encontrado clientes con ese ID";     
            res.status(404).json({code,msg});
        }
    } catch(err){
        console.error("Error al conectar con la BBDD", err.message);
		res.sendStatus(501);
    }
})


//BORRAR UN CLIENTE
router.delete("/:id", async function(req,res){
    const id=req.params.id;
    let code, msg;    

    try{
        let findedClient = await clienteService.getOneClient(id);
       
        if (findedClient.info.length>0){
            let deleteClient = await clienteService.deleteClient(id);           
            if(deleteClient.info.affectedRows>0){
                code=200;
                msg="Cliente eliminado con éxito";
                res.status(200).json({code, msg})
            } else{
                code=400;
                msg="No se ha podido eliminar el cliente"; 
                res.status(400).json({code, msg});
            }
        } else {
            code=404;
            msg="No se han encontrado clientes con ese ID";
            res.status(404).json({code,msg});
        }
    } catch(err){
        console.error("Error al conectar con la BBDD", err.message);
		res.sendStatus(501);
    }
})


//CREAR UN NUEVO CLIENTE                  
router.post("/", async function(req,res){
    const{nombre, apellido1, apellido2, ciudad, categoria}=req.body;
    let newClient;

    if(nombre && apellido1){
        newClient={
            nombre: nombre,
            apellido1: apellido1,
            apellido2: apellido2!=undefined? apellido2 : null,
            ciudad: ciudad!=undefined? ciudad : null,
            categoria: categoria!=undefined? categoria : null
        }
    } else {
        code=400;
        msg="Los campos 'nombre' y 'apellido1' son obligatorios.";
        res.status(400).json({code, msg});
    }

    try{
        let createdClient = await clienteService.createNewClient(newClient);

        if(createdClient.info.affectedRows>0){
            code=200;
            msg="Cliente creado con éxito";

            let createdsID = createdClient.info.insertId; 

            let clienteNuevo = await clienteService.getOneClient(createdsID);
            let info = clienteNuevo.info;
            res.status(200).json({code, msg, info});
        } else {
            code=400;
            msg="Error al crear un nuevo cliente";
            res.status(400).json({code, msg});
        }
    } catch(err){
        console.error("Error al conectar con la BBDD", err.message);
		res.sendStatus(501);
    }
})    
















module.exports = router;