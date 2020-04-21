const {ErrorMessages} =require('../config');

const obtainSkill=(req,res,next)=>{
    try{
        let body=req.body;
        if(body['characterId']==undefined || body['waifuId']==undefined || body['skillId']==undefined){
            res.status(400).send({message:ErrorMessages.MISSING_DATA});
            return;
        }
        else if(typeof body['characterId'] === "string" && typeof body['waifuId'] === "string" && typeof body['skillId'] === "string"){
            next();
        }
    }
    catch(e){
        console.error(e);
        res.status(400).send({message:ErrorMessages.WRONG_VARIABLE});
        return;
    }
}

module.exports={
    obtainSkill:obtainSkill
}