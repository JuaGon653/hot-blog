const router = require('express').Router();
const { User } = require('../../models');

// create a new user
router.post('/', async (req, res) => {
    try{
        const userData = await User.create({
            // gets values from the request body
            username: req.body.username,
            password: req.body.password
        });

        // creates session variables 'user_id' and 'logged_in'
        req.session.save(() => {
            req.session.user_id = userData.id
            req.session.logged_in = true;
            // returns the new user's data
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// login route
router.post('/login', async (req,res) => {
    try {
        // finds a user with the inputted username
        const userData = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        // no user data found will result in error message
        if(!userData) {
            res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
            return;
        };
        
        // boolean to see if the inputted password matches the saved hashed password
        const validPassword = userData.passwordCheck(req.body.password);

        // if passwords don't match, return error message
        if(!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
            return;
        };

        // creates session variables 'user_id' and 'logged_in'
        req.session.save(() => {
            req.session.logged_in = true;
            req.session.user_id = userData.id

            // returns user data and message
            res.status(200).json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        // destroys the session
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
})

module.exports = router;