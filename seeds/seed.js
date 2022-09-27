const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedBlogs = require('./blogData');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await seedUser();

    await seedBlogs();

    process.exit(0);
};

seedDatabase();