const TransactionModel = require("../../../models/TransactionModel")
const { reverseNameConvert } = require("../../../utils/stringFormatter")


const getAdminViewTransactions = async (req, res) => {


    try {
        let transactions =  await TransactionModel.find({})

        // users.role = getRole(req)
        transactions.forEach(element => {
            element.depositor_name = reverseNameConvert(element.depositor_name)
            element.bank = reverseNameConvert(element.bank)
        })
        res.render('adminViewTransactions', {
            transactionsData: transactions
        })
    } catch (error) {
        console.log(error)
        res.send(`An error has occurred: ${error}`)
    }
    



}



module.exports = getAdminViewTransactions