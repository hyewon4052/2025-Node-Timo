const db = require('../config/db');

exports.createUser = async (username, email, password) => {
  try {
    const [result] = await db.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, password]
    );
    return result;
  } catch (err) {
    console.error("회원가입 오류:", err);
    throw err;
  }
};

exports.findByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0]; 
};

exports.findById = async (id) => {
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0]; 
};


exports.updateUser = async (id, username, email, password) => {
  try {
    const [result] = await db.query(
      'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?',
      [username, email, password, id]
    );
    return result;
  } catch (err) {
    console.error("사용자 정보 수정 오류:", err);
    throw err;
  }
};
