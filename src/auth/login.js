const jwt = require('jsonwebtoken');
const config = require('config');
// Never do this!
let users = {
    admin: {password: "admin"},
}

module.exports = function(req, res){
    let username = req.body.user;
    let password = req.body.password;

    console.log(users[username]);
    // Neither do this!
    if (!username || !password || !users[username] || users[username].password !== password) {
        console.log(`User ${username}/${password} not found.`);
        return res.status(401).send('Invalid credentials');
    }

    //use the payload to store information about the user such as username, user role, etc.
    let payload = {username: username}

    //create the access token with the shorter lifespan
    let accessToken = jwt.sign(payload, config.ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: config.ACCESS_TOKEN_LIFE
    })

    //create the refresh token with the longer lifespan
    let refreshToken = jwt.sign(payload, config.REFRESH_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: config.REFRESH_TOKEN_LIFE
    })

    //store the refresh token in the user array
    users[username].refreshToken = refreshToken

    //send the access token to the client inside a cookie
    //res.cookie("jwt", accessToken, {secure: true, httpOnly: true})
    res.cookie("jwt", accessToken, {secure: false, httpOnly: false})
    res.send({token: accessToken})
}