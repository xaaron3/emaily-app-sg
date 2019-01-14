module.exports = (req, res, next) => {
   if (!req.user) {
      return res.status(401).send({ error: 'You must log in!' })
   }

   next()
}

// middleware creation, checking if a user is logged in for payments