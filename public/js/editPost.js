const editPost = async (event) => {
    event.preventDefault();

    const id = event.target.dataset.id;
    console.log(id);
};

document.querySelector('.myPost').addEventListener('click', editPost);