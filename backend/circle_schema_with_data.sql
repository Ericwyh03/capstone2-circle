-- Drop existing tables
DROP TABLE IF EXISTS matches;
DROP TABLE IF EXISTS user_interests;
DROP TABLE IF EXISTS interests;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS institutions;


CREATE TABLE institutions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  location VARCHAR(100)
);


CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  bio TEXT,
  profile_image VARCHAR(255),
  institution_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  FOREIGN KEY (institution_id) REFERENCES institutions(id)
);


CREATE TABLE interests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) UNIQUE
);


CREATE TABLE user_interests (
  user_id INT,
  interest_id INT,
  PRIMARY KEY (user_id, interest_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (interest_id) REFERENCES interests(id) ON DELETE CASCADE
);


CREATE TABLE matches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id_1 INT,
  user_id_2 INT,
  match_score FLOAT,
  status ENUM('pending', 'accepted', 'skipped') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id_1) REFERENCES users(id),
  FOREIGN KEY (user_id_2) REFERENCES users(id)
);

-- Insert interests
INSERT INTO interests (name) VALUES ('Anime');
INSERT INTO interests (name) VALUES ('Gaming');
INSERT INTO interests (name) VALUES ('Coding');
INSERT INTO interests (name) VALUES ('K-pop');
INSERT INTO interests (name) VALUES ('Music');
INSERT INTO interests (name) VALUES ('Drawing');
INSERT INTO interests (name) VALUES ('Hiking');
INSERT INTO interests (name) VALUES ('Volunteering');
INSERT INTO interests (name) VALUES ('Cooking');
INSERT INTO interests (name) VALUES ('Photography');
INSERT INTO interests (name) VALUES ('Reading');
INSERT INTO interests (name) VALUES ('Movies');
INSERT INTO interests (name) VALUES ('Board Games');
INSERT INTO interests (name) VALUES ('Baking');
INSERT INTO interests (name) VALUES ('Travel');
INSERT INTO interests (name) VALUES ('Fitness');
INSERT INTO interests (name) VALUES ('Dancing');
INSERT INTO interests (name) VALUES ('Writing');
INSERT INTO interests (name) VALUES ('Blogging');
INSERT INTO interests (name) VALUES ('Skating');
INSERT INTO interests (name) VALUES ('Swimming');
INSERT INTO interests (name) VALUES ('Basketball');
INSERT INTO interests (name) VALUES ('Football');
INSERT INTO interests (name) VALUES ('Tennis');
INSERT INTO interests (name) VALUES ('Running');
INSERT INTO interests (name) VALUES ('Yoga');
INSERT INTO interests (name) VALUES ('Meditation');
INSERT INTO interests (name) VALUES ('Tech News');
INSERT INTO interests (name) VALUES ('Sci-Fi');
INSERT INTO interests (name) VALUES ('Horror');
INSERT INTO interests (name) VALUES ('Fantasy');
INSERT INTO interests (name) VALUES ('Poetry');
INSERT INTO interests (name) VALUES ('Comics');
INSERT INTO interests (name) VALUES ('Memes');
INSERT INTO interests (name) VALUES ('Streaming');
INSERT INTO interests (name) VALUES ('Puzzles');
INSERT INTO interests (name) VALUES ('Cosplay');
INSERT INTO interests (name) VALUES ('Language Learning');
INSERT INTO interests (name) VALUES ('Investing');
INSERT INTO interests (name) VALUES ('History');
INSERT INTO interests (name) VALUES ('Philosophy');
INSERT INTO interests (name) VALUES ('Astrology');
INSERT INTO interests (name) VALUES ('Environment');
INSERT INTO interests (name) VALUES ('Pets');
INSERT INTO interests (name) VALUES ('Cats');
INSERT INTO interests (name) VALUES ('Dogs');
INSERT INTO interests (name) VALUES ('Nature');
INSERT INTO interests (name) VALUES ('Journaling');
INSERT INTO interests (name) VALUES ('3D Modeling');
INSERT INTO interests (name) VALUES ('UI/UX');
INSERT INTO interests (name) VALUES ('Interior Design');
INSERT INTO interests (name) VALUES ('Makeup');
INSERT INTO interests (name) VALUES ('Fashion');
INSERT INTO interests (name) VALUES ('K-Drama');
INSERT INTO interests (name) VALUES ('J-Pop');
INSERT INTO interests (name) VALUES ('PC Building');
INSERT INTO interests (name) VALUES ('Gadgets');
INSERT INTO interests (name) VALUES ('AR/VR');
INSERT INTO interests (name) VALUES ('Game Dev');
INSERT INTO interests (name) VALUES ('App Dev');
INSERT INTO interests (name) VALUES ('Web Dev');
INSERT INTO interests (name) VALUES ('Machine Learning');
INSERT INTO interests (name) VALUES ('AI');
INSERT INTO interests (name) VALUES ('Robotics');
INSERT INTO interests (name) VALUES ('Astronomy');
INSERT INTO interests (name) VALUES ('Biology');
INSERT INTO interests (name) VALUES ('Chemistry');
INSERT INTO interests (name) VALUES ('Math');
INSERT INTO interests (name) VALUES ('Psychology');
INSERT INTO interests (name) VALUES ('Sociology');
INSERT INTO interests (name) VALUES ('Economics');
INSERT INTO interests (name) VALUES ('Finance');
INSERT INTO interests (name) VALUES ('Marketing');
INSERT INTO interests (name) VALUES ('Startups');
INSERT INTO interests (name) VALUES ('Entrepreneurship');
INSERT INTO interests (name) VALUES ('Leadership');
INSERT INTO interests (name) VALUES ('Sleeping');
INSERT INTO interests (name) VALUES ('Charity Work');
INSERT INTO interests (name) VALUES ('Hackathons');
INSERT INTO interests (name) VALUES ('Coding Challenges');
INSERT INTO interests (name) VALUES ('E-sports');
INSERT INTO interests (name) VALUES ('Speedrunning');
INSERT INTO interests (name) VALUES ('Chess');
INSERT INTO interests (name) VALUES ('Origami');
INSERT INTO interests (name) VALUES ('Calligraphy');
INSERT INTO interests (name) VALUES ('Embroidery');
INSERT INTO interests (name) VALUES ('DIY');
INSERT INTO interests (name) VALUES ('Woodworking');
INSERT INTO interests (name) VALUES ('Carpentry');
INSERT INTO interests (name) VALUES ('Mechanics');
INSERT INTO interests (name) VALUES ('Motorcycles');
INSERT INTO interests (name) VALUES ('Cars');
INSERT INTO interests (name) VALUES ('Skincare');
INSERT INTO interests (name) VALUES ('Wellness');
INSERT INTO interests (name) VALUES ('Nutrition');
INSERT INTO interests (name) VALUES ('Tea');
INSERT INTO interests (name) VALUES ('Coffee');
INSERT INTO interests (name) VALUES ('Martial Arts');
INSERT INTO interests (name) VALUES ('Parkour');
-- Insert a sample institution
INSERT INTO institutions (name, location) VALUES ('Sunway University', 'Malaysia');

-- Assign interests to users
INSERT INTO user_interests (user_id, interest_id) VALUES (1, 73);
INSERT INTO user_interests (user_id, interest_id) VALUES (1, 60);
INSERT INTO user_interests (user_id, interest_id) VALUES (1, 42);
INSERT INTO user_interests (user_id, interest_id) VALUES (1, 47);
INSERT INTO user_interests (user_id, interest_id) VALUES (1, 18);
INSERT INTO user_interests (user_id, interest_id) VALUES (1, 56);
INSERT INTO user_interests (user_id, interest_id) VALUES (2, 65);
INSERT INTO user_interests (user_id, interest_id) VALUES (2, 28);
INSERT INTO user_interests (user_id, interest_id) VALUES (2, 1);
INSERT INTO user_interests (user_id, interest_id) VALUES (2, 48);
INSERT INTO user_interests (user_id, interest_id) VALUES (2, 25);
INSERT INTO user_interests (user_id, interest_id) VALUES (2, 50);
INSERT INTO user_interests (user_id, interest_id) VALUES (2, 3);
INSERT INTO user_interests (user_id, interest_id) VALUES (3, 31);
INSERT INTO user_interests (user_id, interest_id) VALUES (3, 8);
INSERT INTO user_interests (user_id, interest_id) VALUES (3, 10);
INSERT INTO user_interests (user_id, interest_id) VALUES (3, 50);
INSERT INTO user_interests (user_id, interest_id) VALUES (3, 96);
INSERT INTO user_interests (user_id, interest_id) VALUES (3, 33);
INSERT INTO user_interests (user_id, interest_id) VALUES (3, 35);
INSERT INTO user_interests (user_id, interest_id) VALUES (3, 57);
INSERT INTO user_interests (user_id, interest_id) VALUES (4, 80);
INSERT INTO user_interests (user_id, interest_id) VALUES (4, 23);
INSERT INTO user_interests (user_id, interest_id) VALUES (4, 5);
INSERT INTO user_interests (user_id, interest_id) VALUES (4, 89);
INSERT INTO user_interests (user_id, interest_id) VALUES (4, 31);
INSERT INTO user_interests (user_id, interest_id) VALUES (4, 72);
INSERT INTO user_interests (user_id, interest_id) VALUES (4, 95);
INSERT INTO user_interests (user_id, interest_id) VALUES (4, 35);
INSERT INTO user_interests (user_id, interest_id) VALUES (5, 45);
INSERT INTO user_interests (user_id, interest_id) VALUES (5, 76);
INSERT INTO user_interests (user_id, interest_id) VALUES (5, 15);
INSERT INTO user_interests (user_id, interest_id) VALUES (5, 54);
INSERT INTO user_interests (user_id, interest_id) VALUES (5, 47);
INSERT INTO user_interests (user_id, interest_id) VALUES (5, 89);
INSERT INTO user_interests (user_id, interest_id) VALUES (5, 50);
INSERT INTO user_interests (user_id, interest_id) VALUES (6, 20);
INSERT INTO user_interests (user_id, interest_id) VALUES (6, 94);
INSERT INTO user_interests (user_id, interest_id) VALUES (6, 48);
INSERT INTO user_interests (user_id, interest_id) VALUES (6, 43);
INSERT INTO user_interests (user_id, interest_id) VALUES (6, 26);
INSERT INTO user_interests (user_id, interest_id) VALUES (6, 75);
INSERT INTO user_interests (user_id, interest_id) VALUES (6, 49);
INSERT INTO user_interests (user_id, interest_id) VALUES (6, 41);
INSERT INTO user_interests (user_id, interest_id) VALUES (6, 19);
INSERT INTO user_interests (user_id, interest_id) VALUES (6, 95);
INSERT INTO user_interests (user_id, interest_id) VALUES (7, 36);
INSERT INTO user_interests (user_id, interest_id) VALUES (7, 54);
INSERT INTO user_interests (user_id, interest_id) VALUES (7, 60);
INSERT INTO user_interests (user_id, interest_id) VALUES (7, 98);
INSERT INTO user_interests (user_id, interest_id) VALUES (7, 86);
INSERT INTO user_interests (user_id, interest_id) VALUES (7, 4);
INSERT INTO user_interests (user_id, interest_id) VALUES (7, 72);
INSERT INTO user_interests (user_id, interest_id) VALUES (7, 10);
INSERT INTO user_interests (user_id, interest_id) VALUES (8, 92);
INSERT INTO user_interests (user_id, interest_id) VALUES (8, 24);
INSERT INTO user_interests (user_id, interest_id) VALUES (8, 8);
INSERT INTO user_interests (user_id, interest_id) VALUES (8, 54);
INSERT INTO user_interests (user_id, interest_id) VALUES (8, 2);
INSERT INTO user_interests (user_id, interest_id) VALUES (8, 62);
INSERT INTO user_interests (user_id, interest_id) VALUES (8, 3);
INSERT INTO user_interests (user_id, interest_id) VALUES (9, 17);
INSERT INTO user_interests (user_id, interest_id) VALUES (9, 13);
INSERT INTO user_interests (user_id, interest_id) VALUES (9, 3);
INSERT INTO user_interests (user_id, interest_id) VALUES (9, 55);
INSERT INTO user_interests (user_id, interest_id) VALUES (9, 53);
INSERT INTO user_interests (user_id, interest_id) VALUES (10, 33);
INSERT INTO user_interests (user_id, interest_id) VALUES (10, 95);
INSERT INTO user_interests (user_id, interest_id) VALUES (10, 14);
INSERT INTO user_interests (user_id, interest_id) VALUES (10, 86);
INSERT INTO user_interests (user_id, interest_id) VALUES (10, 73);
INSERT INTO user_interests (user_id, interest_id) VALUES (10, 78);
INSERT INTO user_interests (user_id, interest_id) VALUES (10, 49);
INSERT INTO user_interests (user_id, interest_id) VALUES (10, 34);
INSERT INTO user_interests (user_id, interest_id) VALUES (11, 31);
INSERT INTO user_interests (user_id, interest_id) VALUES (11, 34);
INSERT INTO user_interests (user_id, interest_id) VALUES (11, 18);
INSERT INTO user_interests (user_id, interest_id) VALUES (11, 91);
INSERT INTO user_interests (user_id, interest_id) VALUES (11, 39);
INSERT INTO user_interests (user_id, interest_id) VALUES (12, 55);
INSERT INTO user_interests (user_id, interest_id) VALUES (12, 59);
INSERT INTO user_interests (user_id, interest_id) VALUES (12, 80);
INSERT INTO user_interests (user_id, interest_id) VALUES (12, 94);
INSERT INTO user_interests (user_id, interest_id) VALUES (12, 42);
INSERT INTO user_interests (user_id, interest_id) VALUES (12, 66);
INSERT INTO user_interests (user_id, interest_id) VALUES (12, 9);
INSERT INTO user_interests (user_id, interest_id) VALUES (12, 78);
INSERT INTO user_interests (user_id, interest_id) VALUES (12, 79);
INSERT INTO user_interests (user_id, interest_id) VALUES (12, 8);
INSERT INTO user_interests (user_id, interest_id) VALUES (13, 33);
INSERT INTO user_interests (user_id, interest_id) VALUES (13, 24);
INSERT INTO user_interests (user_id, interest_id) VALUES (13, 8);
INSERT INTO user_interests (user_id, interest_id) VALUES (13, 47);
INSERT INTO user_interests (user_id, interest_id) VALUES (13, 56);
INSERT INTO user_interests (user_id, interest_id) VALUES (13, 92);
INSERT INTO user_interests (user_id, interest_id) VALUES (13, 66);
INSERT INTO user_interests (user_id, interest_id) VALUES (13, 51);
INSERT INTO user_interests (user_id, interest_id) VALUES (13, 98);
INSERT INTO user_interests (user_id, interest_id) VALUES (13, 49);
INSERT INTO user_interests (user_id, interest_id) VALUES (14, 61);
INSERT INTO user_interests (user_id, interest_id) VALUES (14, 57);
INSERT INTO user_interests (user_id, interest_id) VALUES (14, 32);
INSERT INTO user_interests (user_id, interest_id) VALUES (14, 80);
INSERT INTO user_interests (user_id, interest_id) VALUES (14, 27);
INSERT INTO user_interests (user_id, interest_id) VALUES (14, 50);
INSERT INTO user_interests (user_id, interest_id) VALUES (14, 94);
INSERT INTO user_interests (user_id, interest_id) VALUES (14, 1);
INSERT INTO user_interests (user_id, interest_id) VALUES (14, 62);
INSERT INTO user_interests (user_id, interest_id) VALUES (15, 93);
INSERT INTO user_interests (user_id, interest_id) VALUES (15, 89);
INSERT INTO user_interests (user_id, interest_id) VALUES (15, 88);
INSERT INTO user_interests (user_id, interest_id) VALUES (15, 71);
INSERT INTO user_interests (user_id, interest_id) VALUES (15, 57);
INSERT INTO user_interests (user_id, interest_id) VALUES (15, 27);
INSERT INTO user_interests (user_id, interest_id) VALUES (15, 70);
INSERT INTO user_interests (user_id, interest_id) VALUES (15, 66);

-- Make sure institution with ID 1 exists
INSERT INTO institutions (name, location) VALUES
('Sunway University', 'Malaysia'),
('University of Malaya', 'Malaysia'),
('Taylor''s University', 'Malaysia'),
('Multimedia University', 'Malaysia'),
('INTI International University', 'Malaysia');

-- Insert 5 users
INSERT INTO users (name, email, password, profile_image, institution_id, bio) VALUES
('Alice Tan', 'usertest1@gmail.com', 'abc123', 'default.png', 1, 'Loves reading and meeting new people.'),
('Brian Lee', 'usertest2@gmail.com', 'abc123', 'default.png', 1, 'Coder by day, gamer by night.'),
('Carmen Low', 'usertest3@gmail.com', 'abc123', 'default.png', 1, 'Passionate about photography and coffee.'),
('Daniel Wong', 'usertest4@gmail.com', 'abc123', 'default.png', 1, 'Enjoys hiking and tech meetups.'),
('Evelyn Chua', 'usertest5@gmail.com', 'abc123', 'default.png', 1, 'Quiet but curious about everything.');
