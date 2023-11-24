<?php
include 'database.php';

$search = $_GET['search'] ?? null;
$filterType = $_GET['filterType'] ?? null;
$postId = $_GET['postId'] ?? null;

$posts = [];

if ($postId) {
    $query = "SELECT blog_posts.*, comment.id AS comment_id, comment.comment, comment.author AS comment_author
              FROM blog_posts
              LEFT JOIN comment ON blog_posts.id = comment.post_id
              WHERE blog_posts.id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $postId);
} else {
    if ($filterType == 'content') {
        $query = "SELECT * FROM blog_posts WHERE content LIKE CONCAT('%', ?, '%')";
    }
    elseif ($filterType == 'category') {
        $query = "SELECT * FROM blog_posts WHERE category LIKE CONCAT('%', ?, '%')";
    }
    elseif ($filterType == 'author') {
        $query = "SELECT * FROM blog_posts WHERE author LIKE CONCAT('%', ?, '%')";
    } 
    else {
        $query = "SELECT * FROM blog_posts WHERE title LIKE CONCAT('%', ?, '%')";
    }
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $search);    
}


$stmt->execute();
$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
    $posts[] = $row;
}

echo json_encode($posts);

$stmt->close();
$conn->close();
?>
