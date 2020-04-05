const checkBody=(req,res,next)=>{
    try{
        let body=req.body['user'];
        console.log(body);
        if(body==undefined){
            res.status(400).send("worng data");
            return;
        }
        else if(body['email']==undefined || body['password']==undefined){
            res.status(400).send("worng data");
            return;
        }
        else if(typeof body['email'] === "string" && typeof body['password'] === "string"){
            next();
        }
    }
    catch(e){
        console.error(e);
        res.status(400).send("worng data");
        return;
    }
}
module.exports={
    checkBody:checkBody
}