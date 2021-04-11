const User = require('../models/User');

module.exports = {
   async default(req, res) {
      const userId = req.userId;

      try {
         const { name } = await User.findById(userId);

         return res.status(200).send({ ok: true, name });
      } catch (error) {
         return res.status(400).send({ error: "Authentication failed!" });
      }
   }
}