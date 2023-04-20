// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewRouter = require('./review.js');
const bookingRouter = require('./booking.js');
const spotImageRouter = require('./spot-image.js');
const reviewImageRouter = require('./review-image.js');
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewRouter);
router.use('/bookings', bookingRouter);
router.use('/spot-images', spotImageRouter);
router.use('/review-images', reviewImageRouter);



router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
});




module.exports = router;
