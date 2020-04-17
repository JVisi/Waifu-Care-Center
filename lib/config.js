const util = require('util');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uuidV4 = require('uuid').v4;

async function encryptPassword (password) {
    password += "zseni";
    let salt = await bcrypt.genSalt(8);
    return bcrypt.hash(password, salt);
}
async function comparePassword(password, hashed) {
    password += "zseni";
    return await bcrypt.compare(password, hashed);
}

const jwToken = "zseni";

const signAsync = util.promisify(jwt.sign);

const signToken = async (token) => {
    return await signAsync({ message: 'OK' }, token);
}
function verifyTokenAsync(token) {
    return new Promise((resolve, reject) => {
        try {
            let result = jwt.verify(token, jwToken);
            resolve(result.message);
        }
        catch (err) {
            reject("token not cool");
        }
    });
}

async function generateId() {
    return uuidV4();
}
const ErrorMessages = {
    ACCESS_DENIED: "Your security level is to low to make this call",
    ALREADY_EXISTS: "Given data has already exists",
    NOT_VALID: "Given data are not valid",
    MISSING_DATA: "One or more required values are missing",
    NOT_FIND: "Can't find the requested data",
    UNKNOWN_ERROR: "Unkown error",
    WRONG_VARIABLE: "Can't recognize incoming data",
    OK: "OK"
}
module.exports = {
    comparePassword: comparePassword,
    signToken: signToken,
    verifyTokenAsync: verifyTokenAsync,
    generateId: generateId,
    encryptPassword: encryptPassword,
    ErrorMessages: ErrorMessages

}