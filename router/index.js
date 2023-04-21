const express = require('express')
const createUser = require('../controllers/createUser')

const passport = require('passport')
const { isAuthenticated } = require('../utils/auth')
const { stringFormatter } = require('../utils/stringFormatter')
const getTransactionsEntryPage = require('../controllers/getTransactionsEntryPage')
const getTransactionsSearchPage = require('../controllers/getTransactionsSearchPage')
const createTransaction = require('../controllers/createTransaction')
const searchTransaction = require('../controllers/searchTransaction')


const router = express.Router()




router.get('/',(req, res, next) => {
    console.log(req.session)
    console.log(req.user)
    next()
}, (req, res) => {
    res.redirect('/signUp')
})

router.get('/transaction-entry', getTransactionsEntryPage)
router.post('/transaction-entry', createTransaction)

router.get('/transaction-search', getTransactionsSearchPage)
router.post('/transaction-search', searchTransaction)

router.get('/signUp', (req, res, next) => {
    console.log(req.session)
    console.log(req.user)
    next()
}, (req, res) => {
    res.render('signUp', {
        message : req.flash('userExists') 
    })
})

router.get('/signIn',  (req, res) => {
 
    res.render('signIn',   {
        message: [req.flash('userSuccess'), req.flash('notSignedIn')]
    })
})

router.get('/dashboard',  isAuthenticated, (req, res) => {
    res.render('dashboard', {
        name : {first_name: stringFormatter(req.user.first_name), last_name: stringFormatter(req.user.last_name)}
    })
})

router.get('/signInFailure', (req, res, next) => {
    if(req.isAuthenticated()){
        res.redirect('/dashboard')
    }else{
        next()
    }
}, (req, res) => {
    res.redirect('/signIn')
})

router.get('/signInSuccess', (req, res, next) => {
    if(!req.isAuthenticated()){
        res.redirect('/signIn')
    }
    else{
        next()
    }
}, (req, res) => {
    res.send(`
    <body>
      <p>Hi you have been signed In, click here to go to your dashboard</p>
      <a href="/dashboard">Dashboard</a>
    </body>`)
})

router.post('/signUp', createUser)

router.post('/signIn', passport.authenticate('local', {failureRedirect: '/signInFailure', successRedirect:'/signInSuccess'}))

router.get('/logout', (req, res, next) => {
    console.log(req.session)
    console.log(req.user)
    next()
},(req, res, next) => {
    req.logout((err) => {if(err){
        return next(err)
    }})
    res.redirect('/')
})


module.exports = router

