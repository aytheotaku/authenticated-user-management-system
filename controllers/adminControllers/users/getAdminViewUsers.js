const User = require("../../../models/UserModel");

const { reverseNameConvert } = require("../../../utils/stringFormatter");

const returnRole = (user) => {
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


const getAdminViewUsers = async (req, res) => {

    try {
        let users =  await User.find({})
        users.forEach(user => {
            user.first_name = reverseNameConvert(user.first_name)
            user.last_name = reverseNameConvert(user.last_name)
            user.role = returnRole(user)
           
        })

        res.render('adminViewUsers', {
            usersData: users
        })
    } catch (error) {
        console.log(error)
        res.send(`An error has occurred: ${error}`)
    }
    



}



module.exports = getAdminViewUsers