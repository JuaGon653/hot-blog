const router = require('express').Router();
const { Blog, User, Comment } = require('../models');

// middle ware to check if a user is logged in
const withAuth = require('../utils/auth');

// displays the homepage with all the posted blogs
router.get('/', withAuth, async (req, res) => {
    try {
        // gathers all of the blogs data with the user's username that posted it 
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

        // separates the needed data from a bunch of unecessary data
        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        // renders the homepage with the passed in values
        res.render('homepage', { blogs, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});

// displays the dashboard with the user's posted blogs
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // finds all blogs with the same user_id as the logged in user
        const userBlogs = Blog.findAll(
            {
                where: {
                    user_id: req.session.user_id
                }
            }
        );

        const blogs = (await userBlogs).map((blog) => blog.get({ plain: true }));

        // renders the dashboard page
        res.render('dashboard', { blogs, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});

// displays the edit-blog page
router.get('/edit-blog/:id', withAuth, async (req, res) => {
    try {
        // grabs the blog and user data with the same id as in the path variables
        const userBlog = await Blog.findByPk(req.params.id, {
            include: {
                model: User,
                attributes: ['username']
            }
        });

        const blog = userBlog.get({ plain: true });

        // renders the edit-blog page
        res.render('edit-blog', {
            blog,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// displays the login page or homepage based off session's 'logged_in' value
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        // homepage
        res.redirect('/');
        return;
    }

    // login page
    res.render('login');
});

// create a new blog
router.post('/create-blog', withAuth, async (req, res) => {
    try {
        // creates a blog with values from the request body and session 'user_id' value
        const createdBlog = await Blog.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });

        // finds blogs with the id of the 'user_id' in the session
        const myBlogs = await Blog.findAll({
            where: {
                user_id: req.session.user_id
            }
        });

        const blogs = myBlogs.map((blog) => blog.get({ plain: true }));

        // renders dashboard with all of user's blogs
        res.render('dashboard', {
            blogs
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// update a blogs data
router.put('/update-blog/:id', withAuth, async (req, res) => {
    try {
        // updates the indicated blog
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

        // returns an '0' or '1' in an array, indicating if it was successful or not 
        res.status(200).json(updateBlog);
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete a blog
router.delete('/delete-blog/:id', withAuth, async (req, res) => {
    try {
        // deletes the blog with the id in the path variable
        const deletedBlog = Blog.destroy({
            where: {
                blogId: req.params.id
            }
        });

        // returns an '0' or '1' in an array, indicating if it was successful or not 
        res.status(200).json(deletedBlog);
    } catch (err) {
        res.status(500).json(err);
    }
});

// displays a blog with its comments
router.get('/blog/:id/comments', withAuth, async (req, res) => {
    try {
        // finds a blog with the same id as in the path variable and includes the blogs user, and the comments with their user's username
        const blogData = await Blog.findByPk(req.params.id, {
            include: [{
                model: User,
                attributes: ['username']
            },
            { 
                model: Comment,
                include: [{ model: User, attributes: ['username'] }]
            }],
            attributes: {
                exclude: ['user_id']
            }
        });

        const blog = blogData.get({ plain: true });

        // renders the view-blog page
        res.render('view-blog', {
            blog,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// create a comment
router.post('/blog/add-comment', withAuth, async (req, res) => {
    try {
        // creates a comment with values from the request body and session
        const createdComment = await Comment.create({
            content: req.body.content,
            blog_id: req.body.blog_id,
            user_id: req.session.user_id
        });

        // returns the created comment's data
        res.status(200).json(createdComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;