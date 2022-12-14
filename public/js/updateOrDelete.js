const updateBlog = async (event) => {
    event.preventDefault();

    const id = document.querySelector('#update').getAttribute('data-blogId');

    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();

    if (title && content) {
        const response = await fetch(`/update-blog/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to upate blog.');
        }
    }
};

const deleteBlog = async (event) => {
    event.preventDefault();

    const id = document.querySelector('#update').getAttribute('data-blogId');
    
    if (id) {
        const response = await fetch(`/delete-blog/${id}`, {
            method: 'DELETE',
            header: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete blog');
        }
    }
}

document.querySelector('#update').addEventListener('click', updateBlog);
document.querySelector('#delete').addEventListener('click', deleteBlog);