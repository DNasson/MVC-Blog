const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const sequelize = require("../config/connections");
// GET all posts for homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "comment", "created_at", "user_id"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
      order: [["created_at", "DESC"]],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
      userusername: req.session.userusername,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one post
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "comment", "created_at", "user_id"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    if (postData) {
      const post = postData.get({ plain: true });
      console.log(post);
      res.render("single-post", {
        post,
        loggedIn: req.session.loggedIn,
        userusername: req.session.userusername,
      });
    } else {
      res.status(404).json({ message: "This id has no post." });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

// signup route
router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
