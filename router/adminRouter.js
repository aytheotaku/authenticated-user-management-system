const express = require('express')
const createUser = require('../controllers/createUser')
const getAdminAddUserPage = require('../controllers/adminControllers/users/getAdminAddUserPage')
const adminCreateUser = require('../controllers/adminControllers/users/adminCreateUser')
const getAdminViewUsers = require('../controllers/adminControllers/users/getAdminViewUsers')
const getAdminAddTransactionsPage = require('../controllers/adminControllers/transactions/getAdminAddTransactionsPage')
const adminCreateTransaction = require('../controllers/adminControllers/transactions/adminCreateTransaction')
const getAdminViewTransactions = require('../controllers/adminControllers/transactions/getAdminViewTransactions')
const getUserToEdit = require('../controllers/adminControllers/users/getUserToEdit')
const editUser = require('../controllers/adminControllers/users/editUser')
const getAdminDeleteUser = require('../controllers/adminControllers/users/getAdminDeleteUser')
const deleteUser = require('../controllers/adminControllers/users/deleteUser')
const getTransactionToDelete = require('../controllers/adminControllers/transactions/getTransactionToDelete')
const deleteTransaction = require('../controllers/adminControllers/transactions/deleteTransaction')



const router = express.Router()

router.get('/portal', (req, res) => {
    res.redirect('/admin/portal/add-user')
})

router.get('/portal/add-user', getAdminAddUserPage)

router.post('/portal/add-user', adminCreateUser)

router.get('/portal/view-users', getAdminViewUsers)

router.get('/portal/edit-user/:id', getUserToEdit)

router.get('/portal/delete-user/:id', getAdminDeleteUser)

router.post('/portal/delete-user/:id', deleteUser)

router.post('/portal/edit-user/:id', deleteUser)

router.get('/portal/add-transaction', getAdminAddTransactionsPage)

router.post('/portal/add-transactions', adminCreateTransaction)

router.get('/portal/view-transactions', getAdminViewTransactions)

router.get('/portal/delete-transaction/:id', getTransactionToDelete)

router.post('/portal/delete-transaction/:id', deleteTransaction)

module.exports = router

