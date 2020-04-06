const {ErrorMessages} =require('../config');

const checkBody=(req,res,next)=>{
    try{
        let body=req.body;
        if(body['email']==undefined || body['password']==undefined){
            res.status(400).send(ErrorMessages.MISSING_DATA);
            return;
        }
        else if(typeof body['email'] === "string" && typeof body['password'] === "string"){
            next();
        }
    }
    catch(e){
        console.error(e);
        res.status(400).send(ErrorMessages.WRONG_VARIABLE);
        return;
    }
}
module.exports={
    checkBody:checkBody
}