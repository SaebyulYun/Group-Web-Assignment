<?php
include 'database.php';

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST['title'];
    $category = $_POST['category'];
    $author = $_POST['author'];
    $content = $_POST['content'];
    $serverTime = date("Y-m-d");
    $imagePath = '';

    // Handle the image upload
    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
        $image = $_FILES['image'];
        $imageName = $image['name'];
        $imageTmpName = $image['tmp_name'];
        $imageSize = $image['size'];
        $imageError = $image['error'];

        // Define where to save the image
        $imageExtension = pathinfo($imageName, PATHINFO_EXTENSION);
        $allowedExtensions = array('jpg', 'jpeg', 'png', 'gif');

        // Check for valid image extension
        if (in_array(strtolower($imageExtension), $allowedExtensions)) {
            // Create unique image file name to prevent overwriting
            $newImageName = uniqid('IMG-', true) . '.' . $imageExtension;
            $imageDestination = 'assets/images/' . $newImageName;
            // console.log($imageDestination);

            // Move the image to the upload folder
            if (move_uploaded_file($imageTmpName, '../'.$imageDestination)) {
                $imagePath = $imageDestination;
            } else {
                echo "Failed to move uploaded file.";
                exit;
            }
        } else {
            echo "You cannot upload files of this type.";
            exit;
        }
    }

    // Insert post data into the database
    $query = "INSERT INTO blog_posts (title, content, author, category, image_path, date) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ssssss", $title, $content, $author, $category, $imagePath, $serverTime);

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
