const express = require('express');
const router = express.Router();
const app = express();
app.use(express.urlencoded());
const passport = require('passport');

const usersController = require('../controllers/users_controller');

//routes with url starting with 'users'
router.get('/profile', passport.checkAuthentication, usersController.profile);
router.get('/sign-in', usersController.signIn);
router.get('/sign-up', usersController.signUp);
router.post('/create', usersController.create);
router.get('/sign-out', usersController.destroySession);
router.get('/reset-password', usersController.resetPassword);
router.post('/update-password',passport.checkAuthentication, usersController.updatePassword);
router.post('/captcha',usersController.captcha);

//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate('local', { failureRedirect: '/users/sign-in' }), usersController.createSession);

//authenticating using passport for google oauth
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/users/sign-in' }), usersController.createSession);

module.exports = router;