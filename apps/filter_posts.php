<?php
include 'database.php';

$search = $_GET['search'];
$filterType = $_GET['filterType'];

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

// $query = "SELECT * FROM blog_posts WHERE title LIKE CONCAT('%', ?, '%')";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $search);
$stmt->execute();
$result = $stmt->get_result();

$posts = [];

while ($row = $result->fetch_assoc()) {
    $posts[] = $row;
}
// while ($row = $result->fetch_assoc()) {
//     $posts[] = $row;
// }

echo json_encode($posts);

$stmt->close();
$conn->close();
?>
