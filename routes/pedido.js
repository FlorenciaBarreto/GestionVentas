const express = require("express");
const router = express.Router();

const pedidoService = require("../services/pedidoService");


//GET FULL LIST
router.get("/", async function(req, res){
    let code, msg;    
    try{
        const fullList = await pedidoService.getPedidosFullList();
        let info=fullList.info;
        code=200;
        msg="Listado de Pedidos encontrados: ";
        res.status(200).json({code, msg, info})
    } catch(err){
        code=501;
        msg="Error en la base de datos";
        res.status(501).json({code, msg});
    } 
})


//GET POR ID_CLIENTE
router.get("/id_cliente/:id_cliente", async function(req, res) {
    let code, msg;
    const id_cliente = req.params.id_cliente;
    try{
        const findedPedido = await pedidoService.getPedidoPorIdDelCliente(id_cliente);
        let info = findedPedido.info;
        if(findedPedido.info.length>0){           
            code=200;
            msg="Pedido con id_cliente " + id_cliente + " encontrado:";
            res.status(200).json({code, msg, info});
        } else {
            code=404;
            msg="No se han encontrado pedidos con el id_cliente: " + id_cliente;
            res.status(404).json({code, msg});
        }
    } catch(err){
        code=501;
        msg="Error en la base de datos";
        res.status(501).json({code, msg});
        console.error("error bd ", err.message);
    }
});

//GET POR ID_COMERCIAL
router.get("/id_comercial/:id_comercial", async function(req, res) {
    let code, msg;
    const id_comercial = req.params.id_comercial;
    try{
        const findedPedido = await pedidoService.getPedidoPorIdDelComercial(id_comercial);
        let info = findedPedido.info;
        if(findedPedido.info.length>0){           
            code=200;
            msg="Pedido con id_comercial " + id_comercial + " encontrado:";
            res.status(200).json({code, msg, info});
        } else {
            code=404;
            msg="No se han encontrado pedidos con el id_comercial: " + id_comercial;
            res.status(404).json({code, msg});
        }
    } catch(err){
        code=501;
        msg="Error en la base de datos";
        res.status(501).json({code, msg});
        console.error("error bd ", err.message);
    }
});

//GET POR ID
router.get("/:id", async function(req, res) {
    let code, msg;
    const id = req.params.id;
    try{
        const findedPedido = await pedidoService.getPedidoPorId(id);
        let info = findedPedido.info;
        if(findedPedido.info.length>0){           
            code=200;
            msg="Pedido con id " + id + " encontrado:";
            res.status(200).json({code, msg, info});
        } else {
            code=404;
            msg="No se han encontrado pedidos con el id: " + id;
            res.status(404).json({code, msg});
        }
    } catch(err){
        code=501;
        msg="Error en la base de datos";
        res.status(501).json({code, msg});
        console.error("error bd ", err.message);
    }
});


//MODIFICAR UN PEDIDO
router.put("/:id", async function(req,res){
    const id=req.params.id;
    const{total, fecha, id_cliente, id_comercial}=req.body;
    let code, msg;

    try{
        let findedPedido = await pedidoService.getPedidoPorId(id);
        if(findedPedido.info.length>0){
            let updatedInfo=findedPedido.info[0];
            if(total){
                updatedInfo.total=total;
            }
            if(fecha){
                updatedInfo.fecha=fecha;
            }
            if(id_cliente){
                updatedInfo.id_cliente=id_cliente;
            }
            if(id_comercial){
                updatedInfo.id_comercial=id_comercial;
            }
            

            let updatedPedido = await pedidoService.modifyPedido(updatedInfo);
            if(updatedPedido.info.changedRows>0){
                code=200;
                msg="El pedido ha sido modificado con éxito.";
                res.status(200).json({code,msg,updatedInfo});
            } else {
                code=401;
                msg="No se ha podido modificar el pedido.";
                res.status(401).json({code, msg});
            }
        } else {
            code=404;
            msg="No se han encontrado pedidos con ese ID";     
            res.status(404).json({code,msg});
        }
    } catch(err){
        console.error("Error al conectar con la BBDD", err.message);
		res.sendStatus(501);
    }
})


//BORRAR UN PEDIDO  
router.delete("/:id", async function(req,res){
    const id=req.params.id;
    let code, msg;    

    try{
        let findedPedido = await pedidoService.getPedidoPorId(id);
       
        if (findedPedido.info.length>0){
            let deletePedido = await pedidoService.deletePedido(id);           
            if(deletePedido.info.affectedRows>0){
                code=200;
                msg="Pedido eliminado con éxito";
                res.status(200).json({code, msg})
            } else{
                code=400;
                msg="No se ha podido eliminar el pedido"; 
                res.status(400).json({code, msg});
            }
        } else {
            code=404;
            msg="No se han encontrado pedidos con ese ID";
            res.status(404).json({code,msg});
        }
    } catch(err){
        console.error("Error al conectar con la BBDD", err.message);
		res.sendStatus(501);
    }
})


//CREAR UN NUEVO PEDIDO             ----------------------------------preguntar     
router.post("/", async function(req,res){
    const{total, fecha, id_cliente, id_comercial}=req.body;
    let newPedido;

    if(total){
        newPedido={
            total: total,
            fecha: fecha!=undefined? fecha : null,
            id_cliente: id_cliente!=undefined? id_cliente : null,            
            id_comercial: id_comercial!=undefined? id_comercial : null            
        }
    } else {
        code=400;
        msg="El campo 'total' es obligatorio.";
        res.status(400).json({code, msg});
    }

    try{
        let createdPedido = await pedidoService.createNewPedido(newPedido);

        if(createdPedido.info.affectedRows>0){
            code=200;
            msg="Pedido creado con éxito";

            let createdsID = createdPedido.info.insertId; 

            let pedidoNuevo = await pedidoService.getPedidoPorId(createdsID);
            let info = pedidoNuevo.info;
            res.status(200).json({code, msg, info});
        } else {
            code=400;
            msg="Error al crear un nuevo pedido";
            res.status(400).json({code, msg});
        }
    } catch(err){
        console.error("Error al conectar con la BBDD", err.message);
		res.sendStatus(501);
    }
})    























module.exports = router;