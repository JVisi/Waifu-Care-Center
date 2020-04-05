const router=require('express').Router();
const {checkToken}=require('./Middlewares/middleWare');
const user=require('./Middlewares/user')
const userService=require('./Services/userServices');

router.get('/',checkToken,(req,res)=>{
    res.send('Authenticated user');
});
router.post('/register',[checkToken,user.checkBody],(req,res)=>{
    userService.register(req.body['user']).then((userObj)=>{
        res.status(200).send(userObj);
    },(err)=>{
        res.status(400).send(err);
    });
})
module.exports={
    router:router
}