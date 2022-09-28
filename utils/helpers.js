module.exports = {
    format_date: (date) => {
        return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
    },
    format_link: (blogId) => {
        return `/edit-post/${blogId}`;
    }
};