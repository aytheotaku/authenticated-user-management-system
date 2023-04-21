const { stringFormatter } = require("../utils/stringFormatter")



const getTransactionsEntryPage = (req, res) => {

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
        message = [req.flash('transactionRegistered')]
    }

    let role;
    switch (true) {
        case req.user.isRegistrar:
            role = 'Registrar'
            break;
    
        case req.user.isReconciler:
            role = 'Reconciler'
            break;
    
        case req.user.isAdmin:
            role = 'Admin'
            break;
    
        default:
            break;
    }

    res.render('createTransaction' , {
        name: `${stringFormatter(req.user.first_name)} ${stringFormatter(req.user.last_name)}`,
        role : role,
        message
    })
}


module.exports = getTransactionsEntryPage