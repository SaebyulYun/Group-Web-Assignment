// new post
document.getElementById('postForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // FormData will automatically capture all fields from the form
    var formData = new FormData(this);

    fetch('apps/add_post.php', {
        method: 'POST',
        body: formData  // FormData will be sent with the correct Content-Type header
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // You can handle the server response here
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


// Delete the post
function deletePost(id) {
    fetch(`apps/delete_post.php?id=${id}`, { method: 'GET' })
        .then(response => response.text())
        .then(data => {
            // reload the post
            loadPosts();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// load and display posts
document.getElementById('filterForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const search = document.getElementById('search').value;
    const filterType = document.querySelector('input[name="filterType"]:checked').value;
    console.log(filterType);
    loadPosts(search, filterType);
});

function loadPosts(search = '', filterType = 'title') {
    fetch(`apps/filter_posts.php?search=${search}&filterType=${filterType}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            const postsDiv = document.getElementById('posts');
            postsDiv.innerHTML = ''; // Clear existing posts
            data.forEach(post => {
                // console.log(post);
                // console.log(post.image_path);
                const postCard = document.createElement('div');
                postCard.className = 'post-card';
                postCard.innerHTML = `
                    <div class="post-header">
                        <span class="post-category">${post.category}</span>
                        <button class="common-button" onclick="commonPost(${post.id})">Common</button>
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
                if( post.common !== null){
                    const postCommon = document.createElement('div');
                    postCommon.className = 'post-common';
                    postCommon.innerHTML = `
                        <h2 class="post-title">Common</h2>
                        <p class="post-excerpt">${post.common}</p>
                        <div class="post-author">${post.common_author}</div>
                        `;
                    postCard.appendChild(postCommon);
                }
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