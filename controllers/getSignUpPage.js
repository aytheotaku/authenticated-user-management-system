const getSignUpPage = (req, res, next) => {
    let message
    if(req.session.flash === undefined){
        message = []
    }
    else if((Object.keys(req.session.flash).length === 0)){
        message = []
    } 
    else if((Object.keys(req.session.flash).length > 0)){
        message = [req.flash('userExists')]
    }
    res.render('signUp', {
        message
    })
}

module.exports = getSignUpPage