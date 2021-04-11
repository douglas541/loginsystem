const jwt = require('jsonwebtoken');
const secret = require('../config/auth.json');

module.exports = (req, res, next) => {
   const authHeader = req.headers.authorization;

   if (!authHeader)
      return res.status(401).send({ error: 'No token provided' });

   const authHeaderParts = authHeader.split(' ');

   if (!authHeaderParts.lenght === 2)
      return res.status(401).send({ error: 'Not a token' });

   const [scheme, token] = authHeaderParts;

   if (!/^Baerer$/i.test(scheme))
      return res.status(401).send({ error: 'Token malformatted' });

   jwt.verify(token, secret.secret, (error, decoded) => {
      if (error)
         return res.status(401).send({ error: 'Invalid token' });

      req.userId = decoded.id;

      return next();
   });
}