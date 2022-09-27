const router = require('express').Router();
const { Blog } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;