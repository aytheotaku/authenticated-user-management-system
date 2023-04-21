const User = require("../../../models/UserModel");
const getRole = require("../../../utils/getRole");
const { reverseNameConvert } = require("../../../utils/stringFormatter");



const getAdminViewUsers = async (req, res) => {


    try {
        let users =  await User.find({})
        users.forEach(user => {
            user.first_name = reverseNameConvert(user.first_name)
            user.last_name = reverseNameConvert(user.last_name)
        })
        // users.role = getRole(req)
        res.render('adminViewUsers', {
            usersData: users
        })
    } catch (error) {
        console.log(error)
        res.send(`An error has occurred: ${error}`)
    }
    



}



module.exports = getAdminViewUsers