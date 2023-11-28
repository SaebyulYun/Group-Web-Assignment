<?php
/**
 * Name:    Assignmnet 2- GroupAssignment-Blog Platform
 * Group:   3 - Saebyul Yun, Kuang-I Ho, Shang-Yuan Chang
 * Date:    Nov 25, 2023 
 * Section: CST8285 302 
 * 
 * @fileoverview
 * For server's connection
 * 
 * @author Saebyul Yun, Kuang-I Ho, Shang-Yuan Chang
 * @version 1.0.0
 * @lastmodified 2023-11-25
 */

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "blogdb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
