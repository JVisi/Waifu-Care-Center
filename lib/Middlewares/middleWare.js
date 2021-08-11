require('dotenv').config
const config = require('../config');
const {verify} = require('jsonwebtoken');

const checkToken=(req,res,next)=>{
    const header = req.headers["authorization"];
    //console.log("Cookies: ",req.cookies)
    let token=""
    if(header === undefined){
        token=req.cookies.secureCookie
        console.log(token)
    }
    else{
        token = header && header.split(' ')[1]
    }
    if (token == null) return res.status(401).send({message:config.ErrorMessages.UNAUTHORIZED})
    verify(token, process.env.ACCESS_TOKEN,(err,decoded)=>{
        if (err) return res.sendStatus(403)
        req.user=decoded
        console.log("User: ", decoded)
        req.userId=decoded.Id
        req.rightLevel=decoded.rightLevel
        next()
    })
}
module.exports={checkToken}