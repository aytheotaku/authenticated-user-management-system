const getSignUpPage = (req, res, next) => {
    let message
    console.log(req.session.flash)
    if(req.session.flash === undefined){
        message = []
    }
    // console.log((Object.keys(req.session.flash).length > 0))
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