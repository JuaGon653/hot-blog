const updatePost = async (event) => {
    event.preventDefault();

    const id = document.querySelector('#update').getAttribute('data-blogId');
    console.log(id);

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
}

document.querySelector('#update').addEventListener('click', updatePost);