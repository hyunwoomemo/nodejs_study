const express = require('express');
const postsRouter = express.Router();

const postsController = require('../controllers/posts.controller');

postsRouter.get('/posts', postsController.getPost)

module.exports = postsRouter;