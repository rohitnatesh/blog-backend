CREATE TABLE people( uid INT(11) PRIMARY KEY AUTO_INCREMENT, uname VARCHAR(20) NOT NULL, birthdate DATE NOT NULL , gender CHAR(1) NOT NULL );
CREATE TABLE credential( uid INT(11) PRIMARY KEY, email VARCHAR(100) NOT NULL UNIQUE, password VARCHAR(200) NOT NULL, security_qus VARCHAR(100) NOT NULL, security_ans VARCHAR(100) NOT NULL, FOREIGN KEY(uid) REFERENCES people(uid) );
CREATE TABLE category( catid INT(11) PRIMARY KEY AUTO_INCREMENT, cname VARCHAR(20) NOT NULL, min_age INT(11) NOT NULL );
CREATE TABLE article( aid INT(11) PRIMARY KEY AUTO_INCREMENT, title VARCHAR(100) NOT NULL, uid INT(11) NOT NULL REFERENCES people(uid), acontent TEXT(4000) NOT NULL, publish_time DATETIME NOT NULL, catid INT(11) NOT NULL REFERENCES category(catid) );
CREATE TABLE comment( cid INT(11) PRIMARY KEY AUTO_INCREMENT, uid INT(11) NOT NULL REFERENCES people(uid), aid INT(11) NOT NULL REFERENCES article(aid), ccontent VARCHAR(50) NOT NULL, comment_time DATETIME NOT NULL );
CREATE TABLE log( idlog INT(11) PRIMARY KEY AUTO_INCREMENT, aid INT(11) NOT NULL REFERENCES article(aid), action_taken VARCHAR(45) NOT NULL, action_time DATETIME NOT NULL );