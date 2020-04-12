const router=require('express').Router();
const {checkToken}=require('./Middlewares/middleWare');
const user=require('./Middlewares/user');
const character=require('./Middlewares/character');
const {UserService}=require('./Services/userServices');
const {CharacterService}=require('./Services/characterServices');

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
router.post('/setCharacter',[checkToken,character.checkCharacterBody],(req,res)=>{
    CharacterService.setCharacter(req.body).then((characterObj)=>{
        res.status(200).send({characterObj:characterObj});
    },(err)=>{
        res.status(400).send({message:err});
    });
});
router.get('/getCharacter',[checkToken],(req,res)=>{
    CharacterService.getCharacterByUserId(req.body).then((characterObj)=>{
        res.status(200).send({characterObj:characterObj});
    },(err)=>{
        res.status(400).send({message:err});
    });
});
router.get('/getWaifus',[checkToken],(req,res)=>{
    CharacterService.getWaifus(req.body).then((waifus)=>{
        console.log(waifus[0]);
        res.status(200).send({waifus:waifus});
    },(err)=>{
        res.status(400).send({message:err});
    });
});
router.post('/setWaifu',[checkToken,character.checkSetWaifu],(req,res)=>{
    CharacterService.setWaifu(req.body).then((result)=>{
        res.status(200).send({result:result});
    },(err)=>{
        res.status(400).send({message:err});
    });
});
module.exports={
    router:router
}