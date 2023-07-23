function isAdmin(req, res, next) {
   if (!req.user || !req.user.isAdmin) {
      const error = new Error('Illegal action');
      error.status = 401;
      return next(error);
   }
   // if the user is an admin, continue with the request
   next();
}

module.exports = isAdmin;