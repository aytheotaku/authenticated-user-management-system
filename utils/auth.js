const isAuthenticated = (req, res, next) => {
const flash = require('connect-flash')   

    if(req.isAuthenticated()){
        next()
    }
    else{
        req.flash('notSignedIn', 'Please Sign In')
        res.redirect('/signIn')
    }

}


module.exports = {isAuthenticated}