const {ErrorMessages} =require('../config');

const checkUserBody=(req,res,next)=>{
    try{
        let body=req.body;
        if(body['email']==undefined || body['password']==undefined){
            res.status(400).send({message:ErrorMessages.MISSING_DATA});
            return;
        }
        else if(typeof body['email'] === "string" && typeof body['password'] === "string"){
            next();
        }
    }
    catch(e){
        console.error(e);
        res.status(400).send({message:ErrorMessages.WRONG_VARIABLE});
        return;
    }
}
const checkCharacterBody=(req,res,next)=>{
    try{
        let body=req.body;
        if(body['id']==undefined || body['name']==undefined){
            res.status(400).send({message:ErrorMessages.MISSING_DATA});
            return;
        }
        else if(typeof body['id'] === "string" && body['id'].length==36 && typeof body['name'] === "string" && body['name'].length>2){
            next();
        }
        else{
            res.status(400).send({message:ErrorMessages.NOT_VALID});
        }
    }catch(e){
        console.error(e);
        res.status(400).send({message:ErrorMessages.WRONG_VARIABLE});
        return;
    }
}
module.exports={
    checkUserBody:checkUserBody,
    checkCharacterBody:checkCharacterBody
}