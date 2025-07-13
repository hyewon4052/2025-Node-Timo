const transactionModel = require('../models/transactionsModel');

exports.createTransaction = async (req, res) => {
  console.log(req.body);
  const { userId, type, amount, description } = req.body;

  if (!userId || !type || !amount || !description) {
    return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
  }

  try {
    const newTransaction = await transactionModel.createTransaction(userId, type, amount, description);

    res.status(201).json({
      message: '입출금 내역이 추가되었습니다.',
      transaction: {
        id: newTransaction.id,
        type: newTransaction.type,
        amount: newTransaction.amount,
        description: newTransaction.description,
        createdAt: newTransaction.created_at,
      },
    });
  } catch (err) {
    console.error('입출금 내역 추가 오류:', err);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.getAllTransaction = async (req,res) => {
   try {
      const transactions = await transactionModel.getAllTransaction();
      res.status(200).json({ transactions });
    } catch (err) {
      console.error('게시물 조회 오류:', err);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
}

exports.getTransactionById = async (req,res) => {
    const { id } = req.params; 
  
    try {
      const transaction = await transactionModel.getTransactionById(id);
  
      if (!transaction) {
        return res.status(404).json({ message: '거래내역을 찾을 수 없습니다.' });
      }
  
      res.status(200).json({ transaction });

    } catch (err) {
      console.error('거래 상세 내역 조회 오류:', err);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
}

exports.getTransactionsByUserId = async (req, res) => {
  const { user_id } = req.params;

  try {
    const transactions = await transactionModel.getTransactionsByUserId(user_id);

    if (transactions.length === 0) {
      return res.status(404).json({ message: '거래내역이 없습니다.' });
    }

    res.status(200).json({
      message: '사용자 거래내역 조회 성공',
      transactions: transactions.map((t) => ({
        id: t.id,
        user_id: t.user_id,
        type: t.type,
        amount: t.amount,
        description: t.description,
        createdAt: t.created_at,
      }))
    });
  } catch (err) {
    console.error('사용자 별 거래 내역 조회 오류:', err);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};
