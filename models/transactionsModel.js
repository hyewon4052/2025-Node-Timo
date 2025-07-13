const db = require('../config/db');

exports.createTransaction = async (userId, type, amount, description) => {
  const [result] = await db.query(
    'INSERT INTO transactions (user_id, type, amount, description, created_at) VALUES (?, ?, ?, ?, NOW())',
    [userId, type, amount, description]
  );

  const [newTransaction] = await db.query('SELECT * FROM transactions WHERE id = ?', [result.insertId]);
  return newTransaction[0];
};

exports.getAllTransaction = async () => {
  const [rows] = await 
  db.query( 'SELECT id, user_id, category_id, type, amount, description, created_at FROM transactions ORDER BY created_at DESC' );
  return rows;
}

exports.getTransactionById = async (id) => {
  const [rows] = await db.query( 'SELECT * FROM transactions WHERE id = ?', [id]);
  return rows[0];
};

exports.getTransactionsByUserId = async (user_id) => {
  const [row] = await db.query('SELECT * FROM transactions WHERE user_id = ?', [user_id]);
  return row;
}