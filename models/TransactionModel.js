const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    depositor_name : {
        type: String,
        required: true,
    },
    bank : {
        type: String,
        required: true
    },
    transaction_amount : {
        type: Number,
        required: true,
    },
    transaction_date : {
        type: Date,
        required: true,
    },
    registeredBy: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

const Transaction = mongoose.model('transaction', TransactionSchema)

module.exports = Transaction