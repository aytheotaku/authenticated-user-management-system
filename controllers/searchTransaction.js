const TransactionModel = require('../models/TransactionModel')
const { stringFormatter, nameConvert, reverseNameConvert } = require('../utils/stringFormatter')

const searchTransaction = async (req, res) => {
    const {depositor_name, bank, transaction_amount, transaction_date} = req.body   

    let role;
    switch (true) {
        case req.user.isRegistrar:
            role = 'Registrar'
            break;
    
        case req.user.isReconciler:
            role = 'Reconciler'
            break;
    
        case req.user.isAdmin:
            role = 'Admin'
            break;
    
        default:
            break;
    }

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
                transactionData : transaction,
                name : `${stringFormatter(req.user.first_name)} ${stringFormatter(req.user.last_name)}`,
                role: role
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