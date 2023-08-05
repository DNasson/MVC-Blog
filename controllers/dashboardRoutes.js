const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

// GET all posts by logged in user
router.get("/dashboard", withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ["password"] },
        include: [{ model: Post }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render("dashboard", {
        ...user,
        logged_in: true,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // GET one post by logged in user
  router.get("/dashboard/edit/:id", withAuth, async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id);
  
      const post = postData.get({ plain: true });
  
      res.render("edit-post", {
        ...post,
        logged_in: true,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });