//intercepta a requisição entre controller e a rota
//verifica se o req e o res estão válidos para receber a resposta do controller

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    
    const authHeader = req.headers.authorization; //recebe o token
    const secret = process.env.SECRET

    if(!authHeader) //verifica se o header foi preenchido
        return res.status(401).send({ error: 'No token provided' });

    const parts = authHeader.split(' ');
    if(parts.length !== 2) //verifica se o header tem duas partes
        return res.status(401).send({ error: 'Token error' });

    const [ scheme, token ] = parts
    if (!/^Bearer$/i.test(scheme)) //verifica se o header contém 'Bearer'
        return res.status(401).send({ error: 'Malformatted Token' });

    jwt.verify(token, secret, (err, decoded) => {
        if(err) return res.status(401).send({ error: 'Invalid Token' });

        req.userId = decoded.id
        return next();
    })
}