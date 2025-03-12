<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the email from POST request
    $email = isset($_POST['newsletter-email']) ? trim($_POST['newsletter-email']) : '';

    // Validate the email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $msg = "Invalid email format.";
        exit();
    }

    $file = "subscribers.txt";
    $entry = $email . "\n";
    file_put_contents($file, $entry, FILE_APPEND | LOCK_EX);

    $msg = "Successfully subscribed!";

} else {
    $msg = "Something Went Wrong. Please Try Again!";
}

header("Location: index.php");
exit();
?>
