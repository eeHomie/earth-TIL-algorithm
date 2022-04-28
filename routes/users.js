const express = require('express');
const User = require('../models/user');
const Comment = require('../models/comment');
const models = require('../models');

const router = express.Router();

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const user = await User.create({
        name: req.body.name,
        age: req.body.age,
        married: req.body.married,
      });
      console.log(user);
      res.status(201).json(user); // 201: Created 요청이 성공적으로 처리되어 자원이 생성되었음
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router.get('/:id/comments', async (req, res, next) => {
  try {
    /*const comments = await Comment.findAll({
      include: {
        model: User,
        where: { id: req.params.id },
      },
    });*/
    const [comments, metadata] = await models.sequelize.query(
      'SELECT * FROM comments',
    );
    console.log('meta~', metadata); // 바로 아래 comments 랑 동일한 결과
    console.log('comments~', comments);
    res.json(comments);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;