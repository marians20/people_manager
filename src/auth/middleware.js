const jwt = require('jsonwebtoken')

const config = require('config');

module.exports = function(req, res, next){
    let accessToken = req.cookies.jwt;
    console.log('********* Middleware ***********');
    if(!accessToken) {
        const authHeader = req.headers.authorization;
        if(authHeader) {
            accessToken = authHeader.split(' ')[1];
        }
    }

    //if there is no token stored in cookies, the request is unauthorized
    if (!accessToken){
        return res.status(403).send()
    }

    let payload
    try{
        //use the jwt.verify method to verify the access token
        //throws an error if the token has expired or has a invalid signature
        payload = jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET)
        next()
    }
    catch(e){
        //if an error occured return request unauthorized error
        return res.status(401).send()
    }
}