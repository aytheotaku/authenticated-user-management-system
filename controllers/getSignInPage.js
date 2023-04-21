const getSignInPage = (req, res) => {
    let message
    console.log(req.session.flash)
    // console.log((Object.keys(req.session.flash).length > 0))
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