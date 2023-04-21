
const getRole  = (req, res) => {
    let role;
    switch(1){
        case req.user.isRegistrar:
            role = 'Registrar'
            break
        case req.user.isReconciler:
            role = 'Reconciler'
            break
        case req.user.isAdmin:
            role = 'Admin'
            break
        default:
            role = 'Unknown'
    }

    return role
}

module.exports = getRole