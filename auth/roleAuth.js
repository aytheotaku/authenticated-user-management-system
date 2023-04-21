
const isAuthAsAdmin = (req, res, next) => {
    if(req.isAuthenticated() && req.user.isAdmin == true) {
        next()
    }
    if(req.isAuthenticated() && req.user.isAdmin !== true){
        res.send('You are not authorized to view this resource').status(401)
    }

}


const isAuthAsReconciler = (req, res, next) => {
    if(req.isAuthenticated() && req.user.isReconciler == true) {
        next()
    }
    if(req.isAuthenticated() && req.user.isReconciler !== true){
        res.send('You are not authorized to view this resource').status(401)
    }
}

const isAuthAsRegistrar = (req, res, next) => {
    if(req.isAuthenticated() && req.user.isRegistrar == true) {
        next()
    }
    if(req.isAuthenticated() && req.user.isRegistrar !== true){
        res.send('You are not authorized to view this resource').status(401)
    }
}



const roleRedirect = (req, res, next) => {
    if(req.isAuthenticated()){
        switch(true){
            case req.user.isRegistrar:
                res.redirect('/transaction-entry')
                break;
            case req.user.isReconciler:
                res.redirect('/transaction-search')
                break;
            case req.user.isAdmin:
                res.redirect('/admin/portal')
                break;
            default:
                console.log('dunno who you are')
                res.send('dunno who you are')
        }
    }
    else if(!req.isAuthenticated()){
        next()
    }
}





module.exports = {isAuthAsAdmin, isAuthAsReconciler, isAuthAsRegistrar, roleRedirect}

