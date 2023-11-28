<?php
/**
 * Name:    Assignmnet 2- GroupAssignment-Blog Platform
 * Group:   3 - Saebyul Yun, Kuang-I Ho, Shang-Yuan Chang
 * Date:    Nov 25, 2023 
 * Section: CST8285 302 
 * 
 * @fileoverview
 * For adding comments
 *
 * @author Saebyul Yun, Kuang-I Ho, Shang-Yuan Chang
 * @version 1.0.0
 * @lastmodified 2023-11-25
 */
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
