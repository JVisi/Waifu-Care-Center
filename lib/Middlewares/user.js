const { ErrorMessages } = require('../config')

const checkUserBody=(req,res,next)=>{
    try{
        let body=req.body;
        console.log(body)
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

module.exports={
    checkUserBody
}