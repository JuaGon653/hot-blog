module.exports = {
    format_date: (date) => {
        return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
    },
    edit_blog_link: (blogId) => {
        return `/edit-blog/${blogId}`;
    },
    view_blog_link: (blogId) => {
        return `/blog/${blogId}/comments`
    }
};