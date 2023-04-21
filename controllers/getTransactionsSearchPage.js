const { stringFormatter } = require("../utils/stringFormatter");

const getTransactionsSearchPage = (req, res) => {
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

    res.render('searchTransaction', {
        name : `${stringFormatter(req.user.first_name)} ${stringFormatter(req.user.last_name)}`,
        role: role
    })
}


module.exports = getTransactionsSearchPage