CREATE DATABASE IF NOT EXISTS nodelogin;

USE nodelogin;

CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(100) NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
); 
ALTER TABLE cars
    ADD PRIMARY KEY (id);

ALTER TABLE cars
    MODIFY id int(11) NOT NULL AUTO_INCREMENT ;


delete from users
where name='utb2';

CREATE TABLE cars(
    id INT(11) NOT NULL,
    matricula VARCHAR(200) NOT NULL,
    tipo VARCHAR(200) NOT NULL,
    user_id INT(11),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

DELETE FROM table cars;
DELETE FROM cars;