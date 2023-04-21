const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const flash = require('connect-flash');
const { generatePassword } = require('../../../utils/passwordUtils');
const setRole = require('../../../utils/setRole');
const User = require('../../../models/UserModel');


const adminCreateUser = async (req, res) => {

    const {first_name, last_name, email, password} = req.body

    let role = setRole(req)

    try {
        let user = await User.findOne({email: email})
        if(user) {
         const message = 'A user with that email already exists'
            res.render('adminAddUserError', {message})
        }

        if(!user){
            let passwordHash = await generatePassword(password)
            await User.create({
                first_name,
                last_name,
                email,
                password : passwordHash, 
                isRegistrar : role.isRegistrar, 
                isReconciler: role.isReconciler, 
                isAdmin : role.isAdmin })

            res.render('adminAddUserSuccess')
        }

    } catch (error) {
        console.log(`An error has occurred : ${err}`)
        res.send('An error occurred')
    }
}


module.exports = adminCreateUser
