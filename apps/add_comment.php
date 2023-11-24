<?php
include 'database.php';

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $author = $_POST['comName'];
    $comment = $_POST['comContent'];
    $postId = $_POST['postId'];
    echo 
    // Insert post data into the database
    $query = "INSERT INTO comment (comment, author, post_id) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("sss", $comment, $author, $postId);

    if ($stmt->execute()) {
        echo "Post added successfully";
        // Redirect to a new page or display success message
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
