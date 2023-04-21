const User = require("../../../models/UserModel")


const deleteUser = async (req, res) => {

    const {id} = req.params

    try {

        let user = await User.deleteOne({_id : id})
        res.render('adminDeleteUserSuccess')

    } catch (err) {
        res.render('adminDeleteUserError', {
            message: err
        })
    }

}

module.exports = deleteUser