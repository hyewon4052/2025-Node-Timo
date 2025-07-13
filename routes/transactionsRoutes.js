const express = require('express');
const router = express.Router();
const transactionsControllers = require('../controllers/transactionsControllers');

router.post('/',transactionsControllers.createTransaction);
router.get('/',transactionsControllers.getAllTransaction);
router.get('/:id',transactionsControllers.getTransactionById);
router.get('/user/:user_id',transactionsControllers.getTransactionsByUserId);

module.exports = router;