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
            data.forEach(post => {

                const postCard = document.createElement('div');
                postCard.className = 'post-card';
                postCard.innerHTML = `
                    <div class="post-header">
                        <span class="post-category">${post.category}</span>
                        <button class="delete-button" onclick="deletePost(${post.id})">X</button>
                    </div>
                    <img src="${post.image_path}" alt="" class="post-image">
                    <div class="post-content">
                        <div class="post-meta">${post.category.toUpperCase()} • ${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                        <h2 class="post-title">${post.title}</h2>
                        <p class="post-excerpt">${post.content}</p>
                        <div class="post-author">${post.author}</div>
                    </div>
                `;
                postCard.dataset.postId = post.id;
                postCard.onclick = function(event) {
                    handlePostCardClick(this.dataset.postId);
                };
                // get the first child
                const firstChild = postsDiv.firstChild;
                // use insertBefore let postCard showing at the very begining
                postsDiv.insertBefore(postCard, firstChild);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}