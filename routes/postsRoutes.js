const express = require('express');
const router = express.Router();
const postsControllers = require('../controllers/postsControllers');

router.post('/', postsControllers.createPost);
router.get('/',postsControllers.getAllPosts);
router.get('/:id', postsControllers.getPostById);

module.exports = router;