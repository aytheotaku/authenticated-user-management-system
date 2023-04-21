const bcrypt = require('bcrypt');

const generatePassword = async (password) => {

    try {
        let saltRounds = 10
        let passwordHash = await bcrypt.hash(password, saltRounds)
         return passwordHash
    } 
    catch (error) {
        return error
    }

}

    
const validatePassword = async (password, passwordHashFromDB) => {

    try {
        let passwordMatch = await bcrypt.compare(password, passwordHashFromDB)
        return passwordMatch
    } catch (error) {
        console.log(`An error has occurred: ${error}`)
    }
}

module.exports = {generatePassword, validatePassword}