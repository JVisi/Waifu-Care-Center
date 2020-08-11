const router=require('express').Router();
const {checkToken}=require('./Middlewares/middleWare');
const user=require('./Middlewares/user');
const character=require('./Middlewares/character');
const skills=require('./Middlewares/skills');
const {UserService}=require('./Services/userServices');
const {CharacterService}=require('./Services/characterServices');
const {WaifuService}=require('./Services/waifuServices');
const {SkillService}=require('./Services/skillServices');

const endPoints={
    "/register":{
        "method":"POST",
        "email":"string",
        "password":"string, at least 2 character"
    },
    "/login":{
        "method":"POST",
        "email":"string",
        "password":"string, at least 2 character"
    },
    "/setCharacter":{
        "method":"POST",
        "name":"string, unique character name",
        "id":"string, userId",
        "money":"number, nullable",
        "experience":"number, nullable",
    },
    "/getCharacter":{
        "method":"GET",
        "id":"userId"
    },
    "/getWaifus":{
        "method":"GET",
        "id":"characterId"
    },
    "/setWaifu":{
        "method":"POST",
        "characterId":"characterId",
        "waifuId":"waifuId",
        "happiness":"number, nullable",
        "battleExp":"number, nullable",
        "tiredness":"number, nullable",
    },
    "/allWaifu":{

    }

}

router.get('/',checkToken,(req,res)=>{
    res.send({endPoints:endPoints});
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
        res.status(200).send({message:err});
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
router.get('/getWaifus',[checkToken],(req,res)=>{       //waifus of character
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
router.get('/allWaifu',[checkToken],(req,res)=>{
    WaifuService.getAllWaifu().then((waifus)=>{
        res.status(200).send({waifus:waifus});
    },(err)=>{
        res.status(400).send({message:err});
    });
});
router.get('/getSkillsOfWaifu',[checkToken],(req,res)=>{
    SkillService.getSkillsOfWaifu(req.body).then((skills)=>{
        res.status(200).send({skills:skills});
    },(err)=>{
        res.status(400).send({message:err});
    });
});
router.post('/obtainSkill',[checkToken,skills.obtainSkill],(req,res)=>{
    SkillService.obtainSkill(req.body).then((haremSkill)=>{
        res.status(200).send({haremSkill:haremSkill});
    },(err)=>{
        res.status(400).send({message:err});
    });
});
module.exports={
    router:router
}