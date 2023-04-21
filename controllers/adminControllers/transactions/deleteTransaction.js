const Transaction = require("../../../models/TransactionModel")

const deleteTransaction = async (req, res) => {
    
    const {id} = req.params
    try {

        let user = await Transaction.deleteOne({_id : id})
        res.render('adminDeleteTransactionSuccess')

    } catch (err) {
        res.send(`An error occurred: ${err}`)
    }

}


module.exports = deleteTransaction