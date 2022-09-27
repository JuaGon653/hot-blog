const newPost = async (event) => {
    event.preventDefault();

    document.querySelector('#post-form').style['visibility'] = 'visible';
};

document.querySelector('#new-post').addEventListener('click', newPost);