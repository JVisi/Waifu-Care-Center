const config=require('../config');

const checkToken=(req,res,next)=>{
    console.log(req.headers);
    const token = req.headers["authorization"];
    config.signToken(token).then((signed)=>{
        config.verifyTokenAsync(signed).then(()=>{
            next();
        },
        (err)=>{
            console.log(err);
            res.status(401).send("Unauthorized");
            return;
        });
    },(unsigned)=>{
        res.status(401).send("Unauthorized");
        return;
    });
}
module.exports={
    checkToken:checkToken
}