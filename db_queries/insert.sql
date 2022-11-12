INSERT INTO `people` (`uid`, `uname`, `birthdate`, `gender`) VALUES (NULL, 'Rohan Adhyapak', '1995-07-25', 'M');
INSERT INTO `credential` (`uid`, `email`, `password`, `security_qus`, `security_ans`) VALUES ('1', 'radhyapak2@student.com', '8717dcd60e053b1ecb09a629399d7025', 'What is your first pet\'s name?', 'Brownie');
INSERT INTO `people` (`uid`, `uname`, `birthdate`, `gender`) VALUES (NULL, 'Ruchitha Jayaraju', '2013-08-15', 'F'), (NULL, 'Mehak Sharma', '2005-11-17', 'F');
INSERT INTO `credential` (`uid`, `email`, `password`, `security_qus`, `security_ans`) VALUES ('2', 'rdatoorjayaraju1@student.com', 'Summer2022', 'What is your first name?', 'Ruchitha');
INSERT INTO `credential` (`uid`, `email`, `password`, `security_qus`, `security_ans`) VALUES ('3', 'msharma16@student.com', 'Fall2022', 'What is your first name?', 'Ruchitha');


INSERT INTO `category` (`catid`, `cname`, `min_age`) VALUES ('1', 'Education', '8');
INSERT INTO `category` (`catid`, `cname`, `min_age`) VALUES ('2', 'Sports', '10');
INSERT INTO `category` (`catid`, `cname`, `min_age`) VALUES ('3', 'Politics', '14');
INSERT INTO `category` (`catid`, `cname`, `min_age`) VALUES ('4', 'Tourism', '12');

-- articles sql
INSERT INTO `article` (`aid`, `title`, `uid`, `acontent`, `publish_time`, `catid`) VALUES (NULL, 'Places to Visit in Atlanta', '3', 'Downtown, Midtown, Peachtree Center', '2022-11-09 20:46:16.000000', '4'), (NULL, 'Politics in Atlanta', '1', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-11-09 20:46:16.000000', '3');
INSERT INTO `article` (`aid`, `title`, `uid`, `acontent`, `publish_time`, `catid`) VALUES (NULL, 'Sport at GSU', '2', 'Lets check what sports we can play at GSU\'s Recreation Center', '2022-11-09 21:17:54.000000', '2');

-- comments sql
INSERT INTO `comment` (`cid`, `uid`, `aid`, `ccontent`, `comment_time`) VALUES ('1', '1', '1', 'What about Lindbergh?', '2022-11-07 06:53:14.000000');
INSERT INTO `comment` (`cid`, `uid`, `aid`, `ccontent`, `comment_time`) VALUES ('2', '1', '1', 'What about North Avenue?', '2022-11-07 21:00:54.000000');
INSERT INTO `comment` (`cid`, `uid`, `aid`, `ccontent`, `comment_time`) VALUES ('3', '2', '1', 'Great Article! But I disagree...', '2022-11-07 21:00:54.000000');
INSERT INTO `comment` (`cid`, `uid`, `aid`, `ccontent`, `comment_time`) VALUES ('4', '3', '3', 'Are there facilities to play squash?', '2022-11-07 21:00:54.000000');

