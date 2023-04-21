const User = require("../../../models/UserModel")
const { nameConvert } = require("../../../utils/stringFormatter")
const setRole = require('../../../utils/setRole')


const editUser = async (req, res) => {
    const {first_name, last_name, email, role} = req.body

    try {
        const {id} = req.params
        let user = await User.findById({_id : id})
        let {isRegistrar, isReconciler, isAdmin} = setRole(req)
        user.first_name = nameConvert(first_name)
        user.last_name = nameConvert(last_name)
        user.email = email
        user.isRegistrar = isRegistrar
        user.isReconciler = isReconciler
        user.isAdmin = isAdmin
        let updatedUser =  await user.save()

       res.render('adminEditUserSuccess')

    } catch (error) {
        res.render('adminEditUserError', {
            message: error
        })
    }
}

module.exports = editUser