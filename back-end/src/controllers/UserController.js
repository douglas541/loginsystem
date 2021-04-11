const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

function tokenGenerator(id) {
   const token = jwt.sign(id, authConfig.secret, {
      expiresIn: 7200,
   });
   return token;
}


module.exports = {
   async index(req, res) {
      const users = await User.find();

      return res.json(users);
   },

   async userRegister(req, res) {
      try {
         const { email } = req.body;

         if (await User.findOne({ email }))
            return res.status(400).json({
               error: 'User alread exists'
            });


         const user = await User.create(req.body);
         user.password = undefined;


         return res.json({
            user,
            token: tokenGenerator({ id: user.id }),
         });

      } catch (error) {
         res.status(400).json({
            error: 'Registration failed',
         });
      }
   },

   async userAuth(req, res) {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).select('+password');

      if (!user)
         res.status(400).json({ error: 'User not found' });

      if (!await bcryptjs.compare(password, user.password))
         res.status(400).json({ error: 'Invalid password' });

      user.password = undefined;

      res.status(200).send({
         user,
         token: tokenGenerator({ id: user.id }),
      });
   }
};