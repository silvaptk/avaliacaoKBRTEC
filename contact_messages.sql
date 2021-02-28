CREATE DATABASE contact_messages;

USE contact_messages;

CREATE TABLE messages(
    id_message INT(11) NOT NULL AUTO_INCREMENT, 
    contact_name VARCHAR(100) NOT NULL, 
    contact_email VARCHAR(200) NOT NULL,
    contact_phone VARCHAR(30) NOT NULL,
    message_content VARCHAR(5000), 

    CONSTRAINT pk_messages PRIMARY KEY (id_message)
);