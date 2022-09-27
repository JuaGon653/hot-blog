const newPost = async (event) => {
    event.preventDefault();

    document.querySelector('#post-form').style['visibility'] = 'visible';
};
const createPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();

    if (title && content) {
        const response = await fetch('/create-blog', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create a new blog.');
        }
    }
}

document.querySelector('#new-post').addEventListener('click', newPost);
document.querySelector('#create').addEventListener('submit', createPost);