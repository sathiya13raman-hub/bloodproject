-- LifeBlood MySQL schema (your existing tables)

CREATE DATABASE IF NOT EXISTS blood CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE blood;

CREATE TABLE signin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userid VARCHAR(30) UNIQUE,
    mailid VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE donortable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    donorid VARCHAR(30) UNIQUE,
    userid VARCHAR(30),
    name VARCHAR(30),
    DOB DATE,
    city VARCHAR(50),
    gender VARCHAR(20),
    Recent_date DATE,
    phonenumber VARCHAR(12) UNIQUE,
    maritalstatus VARCHAR(40),
    CONSTRAINT fk_donor_user
        FOREIGN KEY(userid) REFERENCES signin(userid)
);

CREATE TABLE recipienttable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recipientid VARCHAR(30) UNIQUE,
    userid VARCHAR(30),
    patientname VARCHAR(20),
    contactnumber VARCHAR(12) UNIQUE,
    age INT,
    gender VARCHAR(15),
    unitsreq VARCHAR(20),
    reason VARCHAR(50),
    location VARCHAR(20),
    hospitalname VARCHAR(30),
    frequency VARCHAR(25),
    CONSTRAINT fk_recipient_user
        FOREIGN KEY(userid) REFERENCES signin(userid)
);
