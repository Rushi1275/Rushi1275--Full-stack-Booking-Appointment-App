const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();


router.get('/add-booking', adminController.getAllExpenses);

router.post('/add-booking', adminController.postAddExpense);

router.get('/edit/:Id', adminController.getEditExpense);

 router.post('/update/:Id', adminController.updateExpense);

router.delete('/delete/:Id', adminController.deleteExpense);

module.exports = router;