const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
// const jwt = require('jsonwebtoken'); 나중에해야쥐

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: '이미 가입된 이메일입니다.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userModel.createUser(username, email, hashedPassword);

    res.status(201).json({
      message: '회원가입이 완료되었습니다.',
      user: { id: result.insertId, username, email },
    });
  } catch (err) {
    console.error("회원가입 중 오류 발생:", err);
    res.status(500).json({ error: '서버 오류가 발생했습니다.'});
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findByEmail(email);

    if (!user) {
      return res.status(400).json({ message: '잘못된 이메일 또는 비밀번호입니다.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: '잘못된 이메일 또는 비밀번호입니다.' });
    }

    res.status(200).json({
      message: '로그인 성공',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
};


exports.editUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }

    const updatedUsername = username ?? user.username;
    const updatedEmail = email ?? user.email;

    const updatedPassword = password
      ? await bcrypt.hash(password, 10)
      : user.password;

    if (email && email !== user.email) {
      const existingUser = await userModel.findByEmail(email);
      if (existingUser && existingUser.id !== Number(id)) {
        return res.status(400).json({ message: '이미 사용 중인 이메일입니다.' });
      }
    }

    await userModel.updateUser(id, updatedUsername, updatedEmail, updatedPassword);

    res.status(200).json({
      message: '회원 정보가 수정되었습니다.',
      user: { id, username: updatedUsername, email: updatedEmail },
    });
  } catch (err) {
    console.error("사용자 정보 수정 오류:", err);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
};
