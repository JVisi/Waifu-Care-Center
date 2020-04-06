const router=require('express').Router();
const {checkToken}=require('./Middlewares/middleWare');
const user=require('./Middlewares/user')
const {UserService}=require('./Services/userServices');

router.get('/',checkToken,(req,res)=>{
    res.send('Authenticated user');
});
router.post('/register',[checkToken,user.checkBody],(req,res)=>{
    UserService.register(req.body).then((userObj)=>{
        res.status(200).send({user:userObj});
    },(err)=>{
        res.status(400).send({message:err});
    });
})
module.exports={
    router:router
}