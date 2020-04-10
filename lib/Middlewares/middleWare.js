const config=require('../config');

const checkToken=(req,res,next)=>{
    const token = req.headers["authorization"];
    config.signToken(token).then((signed)=>{
        config.verifyTokenAsync(signed).then(()=>{
            next();
        },
        (err)=>{
            console.error(err);
            res.status(401).send({message:config.ErrorMessages.ACCESS_DENIED});
            return;
        });
    },(unsigned)=>{
        res.status(401).send({message:config.ErrorMessages.ACCESS_DENIED});
        return;
    });
}
module.exports={
    checkToken:checkToken
}