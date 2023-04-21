const mongoose = require('mongoose');
const User = require('../models/UserModel')
const bcrypt = require('bcrypt');
const { generatePassword} = require('../utils/passwordUtils');
const flash = require('connect-flash');
const setRole = require('../utils/setRole');


const createUser = async (req, res) => {

    const {first_name, last_name, email, password} = req.body

    let role = setRole(req)

    try {
        
        let user = await User.findOne({email: email})
        if(user) {
            req.flash('userExists', `A user with the ${user.email} already exists`)
            res.redirect('/signUp')
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

            req.flash('userSuccess', 'User created successfully')

            res.redirect('/signIn')
        }

    } catch (error) {
        console.log(`An error has occurred : ${err}`)
    }
}


module.exports = createUser

