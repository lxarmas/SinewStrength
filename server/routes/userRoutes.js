const router = require('express').Router();
const { User } = require('../db/models/User');
const isAdmin = require('../auth/admin');

router.post('/', isAdmin, async (req, res, next) => {
   try {
      const user = await User.create(req.body);
      res.json(user);
   } catch (err) {
      next(err);
   }
});

router.get('/:userId', isAdmin, async (req, res, next) => {
   try {
      const user = await User.findByPk(req.params.userId);
      if (user) {
         res.json(user);
      } else {
         res.status(404).send('User not found');
      }
   } catch (err) {
      next(err);
   }
});

module.exports = router;