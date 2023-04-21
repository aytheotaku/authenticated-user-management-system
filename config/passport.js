const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/UserModel');
const { validatePassword } = require('../utils/passwordUtils');

const strategy = new LocalStrategy({usernameField:'email', passwordField: 'password'}, async (email, password, done) => {
    try {

        let user = await User.findOne({email : email})
        if(user === null) return done(null, false,{type:'noUserExists', message:'This user does not exist'})
        if(user.length === 0) return done(null, false) //if user not found in db, return null(no error) and false(no user found)
        else{
             const passwordMatch = await validatePassword(password, user.password)
             if(user && !passwordMatch) return done(null, false, {type:'wrongPassword', message:'Wrong Password'}) //if user found in db and passwords do not match, return null(no error) and false(no user found)
             if(user && passwordMatch) {
                // console.log(`This is the user object passed by the callback function of the local strat: ${user}`)
                return done(null, user)
            }   // if user found in db and passwords match, return null(no error) and return the user object, this done function passes the user object to the serializeUser function
        }  
        
    } catch (error) {
        console.log(error)
    }
   
})

passport.use(strategy)

passport.serializeUser((user, done) => {
    // console.log(`This is the user  id object passed by the serialize function: ${user.id}`)
    return done(null, user.id)  //this creates and attaches the passport.user object to the req.session object and sets its value to the id property from the user object passed from the callback function in the local strategy
})
passport.deserializeUser(async (user, done) => {
    try {

        // console.log(`This is the user object in the deserialize function before reaching the find one: ${user}`)
        user = await User.findOne({_id: user})
        console.log(user)
        console.log(`the found user in the deserialize is : ${user}`)
        return done(null, user) //this creates assigns the user object found to the req.user object made by passport connection to the express-sessions library

    } catch (error) {
        console.log(error)
    }
} )




