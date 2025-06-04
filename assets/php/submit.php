<?php
// filepath: c:\Users\USER\Downloads\243954\Elora\HTML\assets\php\submit.php

if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['subject']) && isset($_POST['comment'])) {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $comment = htmlspecialchars($_POST['comment']);

    $html = "
    <table>
        <tr><td><strong>Name:</strong></td><td>$name</td></tr>
        <tr><td><strong>Email:</strong></td><td>$email</td></tr>
        <tr><td><strong>Subject:</strong></td><td>$subject</td></tr>
        <tr><td><strong>Comment:</strong></td><td>$comment</td></tr>
    </table>";

    require 'smtp/PHPMailerAutoload.php';
    $mail = new PHPMailer(true);

    try {
        // SMTP Settings
        $mail->isSMTP();
        $mail->Host = "smtp.gmail.com";
        $mail->Port = 587;
        $mail->SMTPSecure = "tls";
        $mail->SMTPAuth = true;
        $mail->Username = "frank.anconeyra@tecsup.edu.pe"; // Replace with your email
        $mail->Password = ""; // Replace with your app password

        // Email Settings
        $mail->setFrom("frank.anconeyra@tecsup.edu.pe", "Elora Contact Form"); // Replace with your email
        $mail->addAddress("anconeyrafsuyo@gmail.com", "Frank Anconeyra"); // Replace with the recipient email

        $mail->isHTML(true);
        $mail->Subject = "Frank New Contact Info";
        $mail->Body = $html;
		$mail->SMTPDebug = 2;

        // SMTP Options
        $mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            )
        );

        if ($mail->send()) {
            echo "Message Sent Successfully!";
        } else {
            echo "Error: Unable to send the message.";
        }
    } catch (Exception $e) {
        echo "Error: {$mail->ErrorInfo}";
    }
} else {
    echo "Please fill in all the fields.";
}
?>