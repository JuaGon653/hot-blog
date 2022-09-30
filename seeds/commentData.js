const { Comment } = require('../models');

const commentData = [
    {
        content: "This is a comment",
        blog_id: 1
    },
    {
        content: "Another comment",
        blog_id: 2
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;