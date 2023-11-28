<?php
/**
 * Name:    Assignmnet 2- GroupAssignment-Blog Platform
 * Group:   3 - Saebyul Yun, Kuang-I Ho, Shang-Yuan Chang
 * Date:    Nov 25, 2023 
 * Section: CST8285 302 
 * 
 * @fileoverview
 * For deleting the posts
 * 
 *
 * @author Saebyul Yun, Kuang-I Ho, Shang-Yuan Chang
 * @version 1.0.0
 * @lastmodified 2023-11-25
 */

include 'database.php';
// Get the 'id' from URL parameters
$id = $_GET['id'];
// SQL query to delete a blog post with a specific id
$query = "DELETE FROM blog_posts WHERE id = ?";
// Prepare the SQL statement for execution to prevent SQL injection
$stmt = $conn->prepare($query);
// Bind the 'id' parameter to the prepared statement as an integer
$stmt->bind_param("i", $id);
// Execute the prepared statement and check if it was successful
if ($stmt->execute()) {
    // If successful, inform the user
    echo "Post deleted successfully";
} else {
    // If not successful, display an error message
    echo "Error: " . $stmt->error;
}
// Close the statement and the database connection
$stmt->close();
$conn->close();
?>
