document.addEventListener('DOMContentLoaded', function() {
    
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');

    if (postId) {
        loadPost(postId); 
    }
});

function loadPost(postId) {

    fetch(`apps/filter_posts.php?postId=${postId}`)
        .then(response => response.json())
        .then(data => {

            const postsDiv = document.getElementById('posts');
            postsDiv.innerHTML = ''; // Clear existing posts
            const postComment = document.createElement('div');
            postComment.className = 'comment-card';
            
            data.forEach((post, index, array) => {
                const postCard = document.createElement('div');
                postCard.className = 'post-card';

                if (post.comment) {
                    postComment.innerHTML += `
                    <div class="comment-header">
                        <div>
                            <span class="comment-profile-name">${post.comment_author}</span>
                            <span class="comment-profile-verified">&#10003;</span>
                        </div>
                    </div>
                    <div class="comment-content">
                        ${post.comment}
                    </div>
                    `;
                }

                if (index === 0) {
                    postCard.innerHTML = `
                    <div class="post-header">
                        <span class="post-category">${post.category}</span>
                        <button class="delete-button" onclick="deletePost(${post.id})">Delete</button>
                    </div>
                    <img src="${post.image_path}" alt="" class="post-image">
                    <div class="post-content">
                        <div class="post-meta">${post.category.toUpperCase()} • ${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                        <h2 class="post-title">${post.title}</h2>
                        <p class="post-excerpt">${post.content}</p>
                        <div class="post-author">${post.author}</div>
                        <div class="post-actions">
                            <div class="post-action">Like</div>
                            <div class="post-action">Comment</div>
                            <div class="post-action">Share</div>
                        </div>
                    </div>
                    `;
                    postsDiv.appendChild(postCard);
                }
                // use insertBefore let postCard showing at the very begining
                if (index === array.length - 1){
                    postsDiv.appendChild(postComment);
                }
            });

        })
        .catch(error => {
            console.error('Error:', error);
        });
}