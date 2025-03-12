<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

session_start();

// Load Composer's autoloader (Ensure you have installed PHPMailer)
require 'vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Sanitize input
    $firstName = isset($_POST['first-name']) ? htmlspecialchars($_POST['first-name']) : '';
    $lastName  = isset($_POST['last-name']) ? htmlspecialchars($_POST['last-name']) : '';
    $email     = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
    $phone     = isset($_POST['phone-number']) ? htmlspecialchars($_POST['phone-number']) : '';
    $message   = isset($_POST['message']) ? htmlspecialchars($_POST['message']) : '';

    // Validate required fields
    if (empty($firstName) || empty($lastName) || empty($email) || empty($message)) {
        die("Please fill in all required fields.");
    }

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // SMTP configuration
        $mail->isSMTP();
        $mail->Host = $_ENV['SMTP_HOST']; // Use your email provider's SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV['SMTP_USER'];  // Replace with your email
        $mail->Password = $_ENV['SMTP_PASS'];  // Replace with your **app password**, not regular password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = $_ENV['SMTP_PORT'];

        // Sender and recipient settings
        $mail->setFrom($email, "$firstName $lastName");
        $mail->addAddress('hazemyacopbusiness@gmail.com', 'Website Owner'); // Replace with your email

        // Email content
        $mail->Subject = "New Contact Message";
        $mail->Body = "Name: $firstName $lastName\nEmail: $email\nPhone: $phone\n\nMessage:\n$message";

        // Send email
        if ($mail->send()) {
            $msg = "Thank you for contacting us! We will get back to you soon!";
        } else {
            $msg = "Message sending failed. Please try again.";
        }
        
    } catch (Exception $e) {
        $msg = "Message sending failed. Please try again.";
    }
    header("Location: index.php?msg=" . urlencode($msg));
    exit();
}
?>

<?php

