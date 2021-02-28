<?php
    // Enviando mensagem ao banco de dados
    $mysqli = new mysqli('localhost', 'admin', '9109P@tr', 'contact_messages');
    if ($mysqli->connect_error) {
        exit('Não foi possível conectar');
    }

    $name = $_POST["contactName"];
    $email = $_POST["contactEmail"];
    $phone = $_POST["contactPhone"];
    $message = $_POST["contactMessage"];
    
    $sql = "INSERT INTO messages (contact_name, contact_email, contact_phone, message_content) VALUES ('$name', '$email', '$phone', '$message')";

    if(!$mysqli->query($sql)) {
        echo "Erro ao inserir no banco de dados";
        $mysqli->error();
    }

    $mysqli->close();
?> 