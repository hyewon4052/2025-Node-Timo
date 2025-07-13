const db = require('../config/db');

exports.createPost = async (title, content, userId) => {
  const [result] = await db.query(
    'INSERT INTO posts (user_id, title, content, created_at) VALUES (?, ?, ?, NOW())',
    [userId, title, content]
  );

  const [newPost] = await db.query('SELECT * FROM posts WHERE id = ?', [result.insertId]);
  return newPost[0];
};

exports.getAllPosts = async () => {
  const [rows] = await db.query( 'SELECT id, title, content, created_at FROM posts ORDER BY created_at DESC' );
  return rows;
};

exports.getPostById = async (id) => {
  const [rows] = await db.query( 'SELECT * FROM posts WHERE id = ?', [id]);
  return rows[0];
};
