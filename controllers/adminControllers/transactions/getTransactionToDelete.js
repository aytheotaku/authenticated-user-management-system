const Transaction = require("../../../models/TransactionModel")
const { reverseNameConvert } = require("../../../utils/stringFormatter")



const getTransactionToDelete = async (req, res) => {

    const {id} = req.params
    try {
        let transaction = await Transaction.findById({_id: id})
    if(!transaction){
        res.send('No transaction Found')
    }
    else{
        transaction.depositor_name = reverseNameConvert(transaction.depositor_name)
        transaction.bank = reverseNameConvert(transaction.bank)
        transaction.registeredBy = reverseNameConvert(transaction.registeredBy)
        console.log(transaction)
        res.render('adminDeleteTransaction', {
            transactionData : transaction
        })
    }
        
    } catch (error) {
        console.log(error)
        res.send(`An error occurred: ${error}`)
    }

}



module.exports = getTransactionToDelete