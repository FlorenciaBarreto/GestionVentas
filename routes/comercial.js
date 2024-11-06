const express = require("express");
const router = express.Router();

const comercialService = require("../services/comercialService");


//GET FULL LIST
router.get("/", async function(req, res){
    let code, msg;    
    try{
        const fullList = await comercialService.getComercialFullList();
        let info=fullList.info;
        code=200;
        msg="Listado de Comerciales encontrados: ";
        res.status(200).json({code, msg, info})
    } catch(err){
        code=501;
        msg="Error en la base de datos";
        res.status(501).json({code, msg});
    } 
})


//GET POR ID
router.get("/:id", async function(req, res) {
    let code, msg;
    const id = req.params.id;
    try{
        const findedComercial = await comercialService.getOneComercial(id);
        let info = findedComercial.info;
        if(findedComercial.info.length>0){           
            code=200;
            msg="Comercial con id " + id + " encontrado:";
            res.status(200).json({code, msg, info});
        } else {
            code=404;
            msg="No se han encontrado comerciales con el id: " + id;
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
    const{nombre, apellido1, apellido2, comision}=req.body;
    let code, msg;

    try{
        let findedComercial = await comercialService.getOneComercial(id);
        if(findedComercial.info.length>0){
            let updatedInfo=findedComercial.info[0];
            if(nombre){
                updatedInfo.nombre=nombre;
            }
            if(apellido1){
                updatedInfo.apellido1=apellido1;
            }
            if(apellido2){
                updatedInfo.apellido2=apellido2;
            }
            if(comision){
                updatedInfo.comision=comision;
            }
            

            let updatedComercial = await comercialService.modifyComercial(updatedInfo);
            if(updatedComercial.info.changedRows>0){
                code=200;
                msg="El comercial ha sido modificado con éxito.";
                res.status(200).json({code,msg,updatedInfo});
            } else {
                code=401;
                msg="No se ha podido modificar el comercial.";
                res.status(401).json({code, msg});
            }
        } else {
            code=404;
            msg="No se han encontrado comerciales con ese ID";     
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
        let findedComercial = await comercialService.getOneComercial(id);
       
        if (findedComercial.info.length>0){
            let deleteComercial = await comercialService.deleteComercial(id);           
            if(deleteComercial.info.affectedRows>0){
                code=200;
                msg="Comercial eliminado con éxito";
                res.status(200).json({code, msg})
            } else{
                code=400;
                msg="No se ha podido eliminar el comercial"; 
                res.status(400).json({code, msg});
            }
        } else {
            code=404;
            msg="No se han encontrado comerciales con ese ID";
            res.status(404).json({code,msg});
        }
    } catch(err){
        console.error("Error al conectar con la BBDD", err.message);
		res.sendStatus(501);
    }
})


//CREAR UN NUEVO CLIENTE                  
router.post("/", async function(req,res){
    const{nombre, apellido1, apellido2, comision}=req.body;
    let newComercial;

    if(nombre && apellido1){
        newComercial={
            nombre: nombre,
            apellido1: apellido1,
            apellido2: apellido2!=undefined? apellido2 : null,
            comision: comision!=undefined? comision : null            
        }
    } else {
        code=400;
        msg="Los campos 'nombre' y 'apellido1' son obligatorios.";
        res.status(400).json({code, msg});
    }

    try{
        let createdComercial = await comercialService.createNewComercial(newComercial);

        if(createdComercial.info.affectedRows>0){
            code=200;
            msg="Cliente creado con éxito";

            let createdsID = createdComercial.info.insertId; 

            let comercialNuevo = await comercialService.getOneComercial(createdsID);
            let info = comercialNuevo.info;
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