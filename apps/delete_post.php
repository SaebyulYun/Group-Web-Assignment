<?php
include 'database.php';

$id = $_GET['id'];

$query = "DELETE FROM blog_posts WHERE id = ?";

$stmt = $conn->prepare($query);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo "Post deleted successfully";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
