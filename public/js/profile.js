const newFormHandler = async (event) => {   
    event.preventDefault();
    const name = document.querySelector('#post-name').value.trim();
    const description = document.querySelector('#post-desc').value.trim();
    if (name && description) {
        const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({ name, description }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        }
        else {
            alert('Failed to create post');
        }
    }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        }
        else {
            alert('Failed to delete post');
        }
    }
}

const commentFormHandler = async (event) => {
    event.preventDefault();
    const comment = document.querySelector('#comment').value.trim();
    const postId = document.querySelector('#post-id').value.trim();
    if (comment) {
        const response = await fetch(`/api/comment`, {
            method: 'POST',
            body: JSON.stringify({ comment, postId }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.replace(`/post/${postId}`);
        }
        else {
            alert('Failed to create comment');
        }
    }
};


document
    .querySelector('.new-post-form')
    .addEventListener('submit', newFormHandler);

document
    .querySelector('.post-list')
    .addEventListener('click', delButtonHandler);

document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);

    