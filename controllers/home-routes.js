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
                    user_id: req.session.user_id
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

router.get('/edit-post/:id', withAuth, async (req, res) => {
    try {
        const postId = req.params.id;

        const userPost = await Blog.findByPk(postId, {
            include: {
                model: User,
                attributes: ['username']
            }
        });

        const post = userPost.get({ plain: true });
        console.log(post);

        res.render('edit-post', {
            post
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
        const createdBlog = await Blog.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });

        const myBlogs = await Blog.findAll({
            where: {
                user_id: req.session.user_id
            }
        });

        const blogs = myBlogs.map((blog) => blog.get({ plain: true }));

        res.render('dashboard', {
            blogs
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;