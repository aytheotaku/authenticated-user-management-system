const TransactionModel = require('../models/TransactionModel')
const { nameConvert } = require('../utils/stringFormatter')


const createTransaction  =  async (req, res) => {
    const {depositor_name, bank, transaction_amount, transaction_date} = req.body
    try {
           let transaction = await TransactionModel.create({
            depositor_name : nameConvert(depositor_name),
            bank,
            transaction_amount,
            transaction_date
        })
        console.log(transaction)
        res.send('transaction has been created')

    } catch (error) {
        console.log(error)
        res.send("An Error has occurred")
    }
}


module.exports = createTransaction