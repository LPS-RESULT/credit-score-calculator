var jwt = require("jsonwebtoken");

function generateToken(email, secret){
    var token = jwt.sign(email, secret);
    console.log("Generated Token ["+token+"] for "+email);
    return token;
}

function decodeToken(token, secret){
    var payload = jwt.verify(token, secret);
    console.log("Decoded Token ["+token+"] to "+payload);
    return payload;
}

module.exports = {
    generateToken: generateToken,
    decodeToken: decodeToken
};