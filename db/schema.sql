CREATE DATABASE IF NOT EXISTS burgers_db;

USE burgers_db;

CREATE TABLE IF NOT EXISTS burgers (
    "id" INT(45) NOT NULL AUTO_INCREMENT,
    "burger_name" varchar (255),
    "devoured" BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);