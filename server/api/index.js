const router = require('express').Router()
const demonstrationVideosRouter = require('./DemonstrationVideos');

module.exports = router

router.use('/demonstrationVideos', demonstrationVideosRouter);
router.use('/users', require('./users'))
router.use('/trainingPrograms', require('./trainingPrograms'))

router.use((req, res, next) => {
   const error = new Error('Not Found')
   error.status = 404
   next(error)
})
