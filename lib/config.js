require('dotenv').config()
const {sign} = require('jsonwebtoken')
const { genSalt, hash, compare } = require('bcrypt')
const { v4: uuidv4 } = require('uuid')

async function encryptPassword (password) {
    password += "zseni";
    let salt = await genSalt(8);
    return hash(password, salt);
}
async function comparePassword(password, hashed) {
    password += "zseni";
    return await compare(password, hashed);
}

//let refreshTokens=[]

function signToken(user){
    console.log("signotkenuser",user)
    const token = sign(user,process.env.ACCESS_TOKEN)
    return token
}
/* function generateAccesToken(user){
    return sign(user,process.env.ACCESS_TOKEN,{expiresIn:"10s"})
} */
async function generateId() {
    return uuidv4();
}
const ErrorMessages = {
    ACCESS_DENIED: "Your security level is to low to make this call",
    ALREADY_EXISTS: "Given data has already exists",
    EMAIL_IN_USE: "Current email address is already in use",
    NOT_VALID: "Given data are not valid",
    MISSING_DATA: "One or more required values are missing",
    NOT_FIND: "Can't find the requested data",
    NOT_ENOUGH: "You don't have enough money!",
    UNKNOWN_ERROR: "Unkown error",
    UNAVAILABLE:"this action is unavailable",
    WRONG_VARIABLE: "Can't recognize incoming data",
    OK: "OK"
}
module.exports={
    encryptPassword,
    comparePassword,
    signToken,
    generateId,
    ErrorMessages,
    //refreshTokens,
   // generateAccesToken
}