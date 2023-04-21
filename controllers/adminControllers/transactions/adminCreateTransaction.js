const TransactionModel = require("../../../models/TransactionModel")
const { nameConvert } = require("../../../utils/stringFormatter")



const adminCreateTransaction  =  async (req, res) => {
    const {depositor_name, bank, transaction_amount, transaction_date} = req.body
    try {
           let transaction = await TransactionModel.create({
            depositor_name : nameConvert(depositor_name),
            bank,
            transaction_amount,
            transaction_date,
            registeredBy: `${nameConvert(req.user.first_name)}_${nameConvert(req.user.last_name)}`
        })
        console.log(transaction)
        res.render('adminAddTransactionSuccess')

    } catch (error) {
        let message = error
        res.render('adminAddTransactionError', {
            message
        })
    }
}


module.exports = adminCreateTransaction