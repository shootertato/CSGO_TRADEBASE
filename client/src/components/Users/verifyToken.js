require('dotenv').config()
const jwt= require('jsonwebtoken')
const { env: { SECRET } } = process

//funcion que al logearte te da un token
function verifyToken(req, res, next){

    const { headers: { authorization } } = req
    console.log(req)
    // Bearer <Token>
    const token = authorization.replace('Bearer ', '')

    if(!token){
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        })
    }
    const decoded= jwt.verify(token, SECRET);
    req.userId = decoded.id;
    next();
}

module.exports = verifyToken;