const UserModel = require("../../../models/UserModel");
const { reverseNameConvert } = require("../../../utils/stringFormatter");


const getUserToEdit = async (req, res) => {

    const {id} = req.params
    try {
        let user = await UserModel.findById({_id: id})
    if(!user){
        res.render('adminEditUserError')
    }
    else{
        user.first_name = reverseNameConvert(user.first_name)
        user.last_name = reverseNameConvert(user.last_name)
        res.render('adminEditUser', {
            userData : user
        })
    }
        
    } catch (error) {
        console.log(error)
        res.send(`An error occurred: ${error}`)
    }

}



module.exports = getUserToEdit