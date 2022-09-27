const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: [
                        'username'
                    ]
                }
            ]
        });

        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        console.log(blogs);
        res.render('homepage', { blogs });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;