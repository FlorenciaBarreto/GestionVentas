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




















module.exports = router;