const {ErrorMessages} =require('../config');

const checkCharacterBody=(req,res,next)=>{
    try{
        let body=req.body;
        if(body["money"]!=undefined){
            if(typeof body["money"]!=="number"){
                res.status(400).send({message:ErrorMessages.NOT_VALID});
                return;
            }
        } 
        if(body["experience"]!=undefined){
            if(typeof body["experience"]!=="number"){
                res.status(400).send({message:ErrorMessages.NOT_VALID});
                return;
            }
        }
        if(body['name']==undefined){
            res.status(400).send({message:ErrorMessages.MISSING_DATA});
            return;
        }
        else if(typeof body['name'] === "string" && body['name'].length>2){
            next();
        }
        else{
            res.status(400).send({message:ErrorMessages.NOT_VALID});
            return;
        }
    }catch(e){
        console.error(e);
        res.status(400).send({message:ErrorMessages.WRONG_VARIABLE});
        return;
    }
}
const checkSetWaifu=(req,res,next)=>{
    try{
        let body=req.body;
        if(body["happiness"]!=undefined){
            if(typeof body["happiness"]!=="number"){
                res.status(400).send({message:ErrorMessages.NOT_VALID});
                return;
            }
        } 
        if(body["battleExp"]!=undefined){
            if(typeof body["battleExp"]!=="number"){
                res.status(400).send({message:ErrorMessages.NOT_VALID});
                return;
            }
        } 
        if(body["tiredness"]!=undefined){
            if(typeof body["tiredness"]!=="number"){
                res.status(400).send({message:ErrorMessages.NOT_VALID});
                return;
            }
        }
        if(body['characterId']==undefined || body['waifuId']==undefined){
            res.status(400).send({message:ErrorMessages.MISSING_DATA});
            return;
        }
        else if(typeof body['characterId'] === "string" && body['characterId'].length==36 && typeof body['waifuId'] === "string" && body['waifuId'].length==36){
            next();
        }
        else{
            res.status(400).send({message:ErrorMessages.NOT_VALID});
            return;
        }
    }catch(e){
        console.error(e);
        res.status(400).send({message:ErrorMessages.WRONG_VARIABLE});
        return;
    }
}

module.exports={
    checkCharacterBody:checkCharacterBody,
    checkSetWaifu:checkSetWaifu
}