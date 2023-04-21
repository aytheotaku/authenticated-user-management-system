const TransactionModel = require('../models/TransactionModel')
const { nameConvert, stringFormatter } = require('../utils/stringFormatter')


const createTransaction  =  async (req, res) => {
    const {depositor_name, bank, transaction_amount, transaction_date} = req.body
    try {
           let transaction = await TransactionModel.create({
            depositor_name : nameConvert(depositor_name),
            bank,
            transaction_amount,
            transaction_date,
            registeredBy: `${nameConvert(req.user.first_name)}_${nameConvert(req.user.last_name)}`
        })
    
        req.flash('transactionRegistered', 'Transaction Registered')
        res.redirect('/transaction-entry')

    } catch (error) {
        console.log(error)
        res.send("An Error has occurred")
    }
}


module.exports = createTransaction