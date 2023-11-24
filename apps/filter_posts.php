<?php
include 'database.php';

$search = $_GET['search'] ?? null;
$filterType = $_GET['filterType'] ?? null;
$postId = $_GET['postId'] ?? null;

$posts = [];

if ($postId) {
    // 如果提供了 postId，則僅查詢該帖子
    $query = "SELECT * FROM blog_posts WHERE id = ?";
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
