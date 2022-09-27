const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
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
        res.render('homepage', { blogs, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userBlogs = Blog.findAll(
            {
                where: {
                    user_id: req.session.id
                }
            }
        );

        const blogs = (await userBlogs).map((blog) => blog.get({ plain: true }));
        console.log(blogs);

        res.render('dashboard', { blogs });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/edit-post', withAuth, async (req, res) => {
    try {
        const userPosts = 
        res.render('dashboard', {

        })
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.post('/create-blog', async (req, res) => {
    try {
        const createdBlog = Blog.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.body.user_id
        });

        res.status(200).json(createdBlog);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;