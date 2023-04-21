
const setRole = (req, res) => {
    let isRegistrar, isReconciler, isAdmin
    switch(req.body.role){

        case 'registrar' :
            isRegistrar = 1, isReconciler = 0, isAdmin = 0
            break
            case 'reconciler' :
                isRegistrar = 0, isReconciler = 1, isAdmin = 0
                break
            case 'admin' :
                isRegistrar = 0, isReconciler = 0, isAdmin = 1
                break
            default :
            isRegistrar = 0, isReconciler = 0, isAdmin = 0      
    }    
     return {isRegistrar, isReconciler, isAdmin}
}


module.exports = setRole