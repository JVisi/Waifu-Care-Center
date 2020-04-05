const util=require('util');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

const generateHashedPassword=async (password)=>{
    password+="zseni";
    let salt=await bcrypt.genSalt(8);
    return bcrypt.hash(password,salt);
}
const comparePassword=async (password,hashed)=>{
    password+="zseni";
    return await bcrypt.compare(password,hashed);
}

const jwToken="zseni";
const signAsync=util.promisify(jwt.sign);

const signToken= async(token)=>{
    return await signAsync({message:'OK'},token);
}
const verifyTokenAsync=(token)=>{
    return new Promise((resolve,reject)=>{
        try{
            let result=jwt.verify(token,jwToken);
            resolve(result.message);
        }
        catch(err){
            reject("shit")
        }
    });
}


module.exports={
    generateHashedPassword:generateHashedPassword,
    comparePassword:comparePassword,
    signToken:signToken,
    verifyTokenAsync:verifyTokenAsync

}