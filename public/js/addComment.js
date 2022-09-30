const addComment = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#comment').value.trim();
    const blog_id = window.location.pathname.charAt(6);

    if(content.length > 0) {
        const response = await fetch('/blog/add-comment', {
            method: 'POST',
            body: JSON.stringify({ content, blog_id }),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            document.location.reload(true);
        } else {
            alert('Failed to post comment.');
        }
    }
};

document.querySelector('.comment-form').addEventListener('submit', addComment);