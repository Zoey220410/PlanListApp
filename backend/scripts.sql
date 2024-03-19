
DROP DATABASE IF EXISTS my_plan;

CREATE DATABASE my_plan;

USE my_plan;


CREATE TABLE User (
  UserID INT PRIMARY KEY AUTO_INCREMENT,
  Username VARCHAR(50) NOT NULL UNIQUE,
  Password VARCHAR(255) NOT NULL,
  Name VARCHAR(100),
  Email VARCHAR(100),
  Birthday DATE,
  Country VARCHAR(50),
  Avatar TEXT
);


CREATE TABLE Friendship (
  FriendshipID INT PRIMARY KEY AUTO_INCREMENT,
  UserID INT,
  FriendID INT
);

CREATE TABLE Post (
  PostID INT PRIMARY KEY AUTO_INCREMENT,
  UserID INT,
  TextContent TEXT,
  Title VARCHAR(255),
  FOREIGN KEY (UserID) REFERENCES User(UserID)
);

CREATE TABLE PostImage (
  ImageID INT PRIMARY KEY AUTO_INCREMENT,
  PostID INT,
  FileId INT
);

CREATE TABLE ImageUpload (
    FileID INT PRIMARY KEY AUTO_INCREMENT,
  UserID INT,
  UploadPath VARCHAR(255),
  Path TEXT
);

CREATE TABLE PostLike (
  PostLikeID INT PRIMARY KEY AUTO_INCREMENT,
  UserID INT,
  PostID INT
);


CREATE TABLE Plan (
  PlanID INT PRIMARY KEY AUTO_INCREMENT,
  UserID INT,
  PlanDate DATE,
  StartTime TIME,
  EndTime TIME,
  AlarmReminder BOOLEAN,
  Tag VARCHAR(50),
  ImportanceLevel INT
);

CREATE TABLE PlanCompleteHis (
  HisID INT PRIMARY KEY AUTO_INCREMENT,
  UserID INT,
  PlanID INT,
  completeTime DATETIME,
  score int
);









