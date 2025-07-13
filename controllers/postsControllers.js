const postModel = require('../models/postsModel');

exports.createPost = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: '제목과 내용을 모두 입력해주세요.' });
  }

  try {
    const newPost = await postModel.createPost(title, content);

    res.status(201).json({
      message: '게시물이 등록되었습니다.',
      post: {
        id: newPost.id,
        title: newPost.title,
        content: newPost.content,
        createdAt: newPost.created_at,
      }
    });
  } catch (err) {
    console.error('게시물 등록 오류:', err);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.getAllPosts();
    res.status(200).json({ posts });
  } catch (err) {
    console.error('게시물 조회 오류:', err);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;

  console.log('postId:', id); 

  try {
    const post = await postModel.getPostById(id);

    if (!post) {
      return res.status(404).json({ message: '게시물을 찾을 수 없습니다.' });
    }

    res.status(200).json({
      post: {
        id: post.id,
        title: post.title,
        content: post.content,
        createdAt: post.created_at,
      }
    });
  } catch (err) {
    console.error('단일 게시물 조회 오류:', err);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};
