module.exports = {
    format_date: (date) => {
        return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
    },
    format_link: (blogId) => {
        return `/edit-post/${blogId}`;
    }
};