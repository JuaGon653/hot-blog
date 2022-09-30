const { Comment } = require('../models');

const commentData = [
    {
        content: "This is a comment",
        blog_id: 1,
        user_id: 2
    },
    {
        content: "Another comment",
        blog_id: 2,
        user_id: 1
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;