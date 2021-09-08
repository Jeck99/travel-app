const profileRouter = require('express').Router()
const profileCtrl = require('../controllers/profilesCtrl')

profileRouter.post('/register', profileCtrl.register)
profileRouter.post('/login', profileCtrl.login)

module.exports = profileRouter;
