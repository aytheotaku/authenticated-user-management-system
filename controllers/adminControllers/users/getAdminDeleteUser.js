const UserModel = require("../../../models/UserModel");
const { reverseNameConvert } = require("../../../utils/stringFormatter");



const getRole  = (user) => {
    let role;
    switch(true){
        case user.isRegistrar:
            role = 'Registrar'
            break
        case user.isReconciler:
            role = 'Reconciler'
            break
        case user.isAdmin:
            role = 'Admin'
            break
        default:
            role = 'Unknown'
    }

    return role
}

const getAdminDeleteUser = async (req, res) => {

    const {id} = req.params
    try {
        let user = await UserModel.findById({_id: id})
    if(!user){
        res.send('No user found')
    }
    else{
        user.first_name = reverseNameConvert(user.first_name)
        user.last_name = reverseNameConvert(user.last_name)
        user.role = getRole(user)
        
        res.render('adminDeleteUser', {
            userData : user
        })
    }
        
    } catch (error) {
        console.log(error)
        res.send(`An error occurred: ${error}`)
    }

}


module.exports = getAdminDeleteUser