const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
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

        res.render('dashboard', { blogs, logged_in: req.session.logged_in });
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
});

router.put('/update-blog/:id', async (req, res) => {
    try {
        const updateBlog = Blog.update(
            {
                title: req.body.title,
                content: req.body.content,
                user_id: req.session.user_id
            },
            {
                where: {
                    blogId: req.params.id
                }
            }
        );

        res.status(200).json(updateBlog);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/delete-post/:id', async (req, res) => {
    try {
        const deletedBlog = Blog.destroy({
            where: {
                blogId: req.params.id
            }
        });

        res.status(200).json(deletedBlog);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blog/:id/comments', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [{
                model: User,
                attributes: ['username']
            },
            { 
                model: Comment,
                attributes: ['content'] 
            }],
            attributes: {
                exclude: ['user_id']
            }
        });

        const blog = blogData.get({ plain: true });

        const userData = await User.findOne({
            where: {
                id: req.session.user_id
            }
        });

        const user = userData.get({ plain: true });

        res.render('view-post', {
            blog,
            user,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/blog/add-comment', async (req, res) => {
    try {
        const createdComment = await Comment.create({
            content: req.body.content,
            blog_id: req.body.blog_id
        });

        res.status(200).json(createdComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;