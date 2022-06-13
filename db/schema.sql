DROP DATABASE IF EXISTS music_review_db;

CREATE DATABASE music_review_db;

USE music_review_db;


-- CREATE TABLE User (
--     id INTEGER AUTO_INCREMENT PRIMARY KEY,
--     username VARCHAR(30) NOT NULL,
--     email VARCHAR(30) NOT NULL,
--     password VARCHAR(30) NOT NULL
-- );

-- CREATE TABLE Review (
--     id INTEGER AUTO_INCREMENT PRIMARY KEY,
--     title VARCHAR(30) NOT NULL,
--     user_id INTEGER,
--     CONSTRAINT fk_user_review FOREIGN KEY (user_id)
--     REFERENCES User(id),
--     rating INTEGER NOT NULL,
--     review_text TEXT 
-- );

-- CREATE TABLE Comment (
--     id INTEGER AUTO_INCREMENT PRIMARY KEY,
--     comment_text VARCHAR(50) NOT NULL,
--     user_id INTEGER,
--     CONSTRAINT fk_user_comment FOREIGN KEY (user_id)
--     REFERENCES User(id),
--     review_id INTEGER,
--     CONSTRAINT fk_review_id FOREIGN KEY(review_id)
--     REFERENCES Review(id)
-- );

-- CREATE TABLE Vote (
--     id INTEGER AUTO_INCREMENT PRIMARY KEY, 
--     user_id INTEGER,
--     CONSTRAINT fk_user_vote FOREIGN KEY(user_id)
--     REFERENCES User(id),
--     review_id INTEGER,
--     CONSTRAINT fk_review_vote FOREIGN KEY(review_id)
--     REFERENCES Review(id)
-- );