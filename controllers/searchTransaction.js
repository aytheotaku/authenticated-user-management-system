const TransactionModel = require('../models/TransactionModel')
const { nameConvert, reverseNameConvert } = require('../utils/stringFormatter')

const searchTransaction = async (req, res) => {
    const {depositor_name, bank, transaction_amount, transaction_date} = req.body   

    try {
        let transaction = await TransactionModel.find({
            depositor_name : nameConvert(depositor_name),
            bank,
            transaction_amount,
            transaction_date
        })

        transaction.forEach(element => {
            element.depositor_name = reverseNameConvert(element.depositor_name)
            element.bank = reverseNameConvert(element.bank)
            console.log(element.depositor_name)
            console.log(element.bank)
        })

        if(transaction.length > 0){
            console.log(transaction)
            res.render('searchTransactionResults', {
                transactionData : transaction
            })  
        }
        if(transaction.length === 0){
            res.send('no transaction found')
        }

    } catch (error) {
        console.log(error)
    }

}




module.exports = searchTransaction