const express = require('express')
const createUser = require('../controllers/createUser')
const getTransactionsEntryPage = require('../controllers/getTransactionsEntryPage')
const getTransactionsSearchPage = require('../controllers/getTransactionsSearchPage')
const createTransaction = require('../controllers/createTransaction')
const searchTransaction = require('../controllers/searchTransaction')
const passport = require('passport')
const getSignUpPage = require('../controllers/getSignUpPage')
const getSignInPage = require('../controllers/getSignInPage')
const { isAuthenticated } = require('../auth/isAuthenticated')
const { roleRedirect, isAuthAsReconciler, isAuthAsRegistrar } = require('../auth/roleAuth')


const router = express.Router()




router.get('/', (req, res) => {
    res.redirect('/signUp')
})

router.get('/transaction-entry', isAuthenticated, isAuthAsRegistrar, getTransactionsEntryPage)
router.post('/transaction-entry', isAuthenticated, isAuthAsRegistrar, createTransaction)

router.get('/transaction-search', isAuthenticated, isAuthAsReconciler, getTransactionsSearchPage)
router.post('/transaction-search', isAuthenticated, isAuthAsReconciler,searchTransaction)

router.get('/signUp', roleRedirect, getSignUpPage)


router.get('/signIn', roleRedirect, getSignInPage)

router.get('/signInFailure', (req, res) => {
    res.send('Wrong Email Or Password') 
})

router.get('/role', roleRedirect)

router.post('/signUp', createUser)

router.post('/signIn', passport.authenticate('local', {failureRedirect: '/signIn', failureFlash:true, successRedirect: '/role'}))

router.get('/logout', (req, res, next) => {
    next()
},(req, res, next) => {
    req.logout((err) => {if(err){
        return next(err)
    }})
    res.redirect('/')
})


module.exports = router

