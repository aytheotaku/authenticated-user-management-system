const getSignInPage = (req, res) => {
    let message
    if(req.session.flash === undefined){
        message = []
    }
    else if((Object.keys(req.session.flash).length === 0)){
        message = []
    } 
    else if((Object.keys(req.session.flash).length > 0)){
        message = [req.flash('userSuccess'), req.flash('noUserExists'), req.flash('wrongPassword'), req.flash('notSignedIn')]
    }
    res.render('signIn', {
        message
    })
}

module.exports = getSignInPage