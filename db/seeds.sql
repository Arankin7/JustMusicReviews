-- User seeds
INSERT INTO User(username, email, password)
VALUES
('testuser1', 'test1@gmail.com', 'password1'),
('testuser2', 'test2@gmail.com', 'password2'),
('testuser3', 'test3@gmail.com', 'password3'),
('testuser4', 'test4@gmail.com', 'password4'),
('testuser5', 'test5@gmail.com', 'password5');

-- Review seeds
INSERT INTO Review(title, user_id, rating, review_text)
VALUES
('test title 1', 1, 5, 'review text test 1'),
('test title 2', 2, 4, 'review text test 2'),
('test title 3', 3, 3, 'review text test 3'),
('test title 4', 4, 2, 'review text test 4'),
('test title 5', 5, 1, 'review text test 5');

-- Comment seeds
INSERT INTO Comment(user_id, review_id, comment_text)
VALUES
(1, 5, 'test comment 1'),
(2, 4, 'test comment 2'),
(3, 3, 'test comment 3'),
(4, 2, 'test comment 4'),
(5, 1, 'test comment 5');


-- Vote Seeds
INSERT INTO Vote(user_id, review_id)
VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(2, 2),
(2, 3),
(2, 4),
(3, 3),
(3, 4),
(3, 5),
(4, 4),
(4, 5),
(5, 5);
