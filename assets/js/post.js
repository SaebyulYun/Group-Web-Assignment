// new post
document.getElementById('postForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // FormData will automatically capture all fields from the form
    var formData = new FormData(this);
    console.log(formData);
    fetch('apps/add_post.php', {
        method: 'POST',
        body: formData  // FormData will be sent with the correct Content-Type header
    })
    .then(response => response.text())
    .then(data => {
        // Reload posts
        loadPosts();
        // Reset the form
        document.getElementById('postForm').reset();
        postForm.style.display = 'none';
        cancell.style.display = 'none'; 

    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// load and display posts
document.getElementById('filterForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const search = document.getElementById('search').value;
    const filterType = document.querySelector('input[name="filterType"]:checked').value;
    loadPosts(search, filterType);
});

function loadPosts(search = '', filterType = 'title', postId = null) {

    fetch(`apps/filter_posts.php?search=${search}&filterType=${filterType}`)
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
                postCard.onclick = function() {
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

// view post 
function handlePostCardClick(postId) {
    window.location.href = 'comment.html?postId=' + postId;
}

// search input
const searchInput = document.getElementById('search');
const filterTypeDiv = document.getElementById('filterType');

searchInput.addEventListener('input', function () {
  
  const searchText = searchInput.value.trim().toLowerCase();

  if (searchText !== '') {
    filterTypeDiv.style.display = 'block'; 
    filterTypeDiv.style.opacity = 1; 
  } else {
    filterTypeDiv.style.opacity = 0; 
    filterTypeDiv.style.display = 'none';
  }
});

// search input
const postForm = document.getElementById('postForm');
const addPost = document.getElementById('addPost');
const cancell = document.getElementById('cancell');

addPost.addEventListener('click', function () {
    postForm.style.display = 'block'; 
    cancell.style.display = 'inline-block'; 
});

cancell.addEventListener('click', function () {
    postForm.style.display = 'none'; 
    cancell.style.display = 'none'; 
});

const uploadImg = document.getElementById('uploadImg');
const fileInput = document.getElementById('image');

uploadImg.addEventListener('click', function () {
  fileInput.click();
});

// load posts
loadPosts();