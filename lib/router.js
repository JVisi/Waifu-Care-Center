const router= require('express').Router()
const  {checkToken} = require('./Middlewares/middleWare.js');
const { checkUserBody } = require('./Middlewares/user.js');
const { checkCharacterBody, checkSetWaifu } = require('./Middlewares/character.js');
const { obtainSkill }= require('./Middlewares/skills.js');
const { UserService } =require('./Services/userServices.js');
const { CharacterService } =require('./Services/characterServices.js');
const { WaifuService } = require('./Services/waifuServices.js');
const { SkillService } = require('./Services/skillServices.js');
//const {refreshTokens, generateAccesToken} =require('./config')

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

/*router.post('/token',(req,res)=>{
    const refreshToken=req.body.token
    if(refreshToken==null) res.sendStatus(401)
    if(!refreshTokens.includes(refreshToken)) res.sendStatus(403)
    jwt.verify(refreshToken, process.env.ACCESS_TOKEN_REFRESH, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
      })
})*/

router.get('/',checkToken,(req,res)=>{
    res.send({endPoints:endPoints});
});
router.post('/register',[checkUserBody],(req,res)=>{
    UserService.register(req.body).then((token)=>{
        res.status(200).send({token:token});
    },(err)=>{
        console.log(err)
        res.status(400).send({message:err});
    });
});
router.post('/login',[checkUserBody],(req,res)=>{
    UserService.login(req.body).then((token)=>{
        
        res.cookie("secureCookie", token, {
            httpOnly: true
          });
          res. header("Access-Control-Allow-Origin", "http://localhost:3000");

        res.status(200).send({token:token});
    },(err)=>{
        res.status(400).send({message:err});
    });
});
router.post('/setCharacter',[checkToken,checkCharacterBody],(req,res)=>{
    CharacterService.setCharacter(req.userId,req.body).then((characterObj)=>{
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
router.post('/setWaifu',[checkToken,checkSetWaifu],(req,res)=>{
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
router.post('/obtainSkill',[checkToken,obtainSkill],(req,res)=>{
    SkillService.obtainSkill(req.body).then((haremSkill)=>{
        res.status(200).send({haremSkill:haremSkill});
    },(err)=>{
        res.status(400).send({message:err});
    });
});

module.exports={router}