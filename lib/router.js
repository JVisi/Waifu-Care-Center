const router=require('express').Router();
const {checkToken}=require('./Middlewares/middleWare');
const user=require('./Middlewares/user')
const {UserService}=require('./Services/userServices');

router.get('/',checkToken,(req,res)=>{
    res.send('Authenticated user');
});
router.post('/register',[checkToken,user.checkUserBody],(req,res)=>{
    UserService.register(req.body).then((userObj)=>{
        res.status(200).send({user:userObj});
    },(err)=>{
        res.status(400).send({message:err});
    });
});
router.post('/login',[checkToken,user.checkUserBody],(req,res)=>{
    UserService.login(req.body).then((userObj)=>{
        res.status(200).send({user:userObj});
    },(err)=>{
        res.status(400).send({message:err});
    });
});
router.post('/setCharacter',[checkToken,user.checkCharacterBody],(req,res)=>{
    UserService.setCharacter(req.body).then((characterObj)=>{
        res.status(200).send({characterObj:characterObj});
    },(err)=>{
        res.status(400).send({message:err});
    });
});
router.get('/getCharacter',[checkToken],(req,res)=>{
    UserService.getCharacter(req.body).then((characterObj)=>{
        res.status(200).send({characterObj:characterObj});
    },(err)=>{
        res.status(400).send({message:err});
    });
})
module.exports={
    router:router
}