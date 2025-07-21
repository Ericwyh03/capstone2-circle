-- Drop existing tables
DROP TABLE IF EXISTS matches;
DROP TABLE IF EXISTS user_interests;
DROP TABLE IF EXISTS interests;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS institutions;
DROP TABLE IF EXISTS events
DROP TABLE IF EXISTS user_events;
DROP TABLE IF EXISTS mentorships;
DROP TABLE IF EXISTS connections;
DROP TABLE IF EXISTS user_interests;
DROP TABLE IF EXISTS match_requests;
DROP TABLE IF EXISTS event_user;
DROP TABLE IF EXISTS mentors;
DROP TABLE IF EXISTS mentor_request;

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

CREATE TABLE events (
                        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                        creator_id BIGINT UNSIGNED NULL,
                        name VARCHAR(255) NOT NULL,
                        description TEXT NULL,
                        start_time DATETIME NOT NULL,
                        end_time DATETIME NULL,
                        location VARCHAR(255) NOT NULL,
                        privacy ENUM('public', 'friends', 'private') DEFAULT 'public',
                        color ENUM('blue', 'green', 'pink', 'purple', 'grey') DEFAULT 'blue';
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE user_events (
                             user_id INT,
                             event_id INT,
                             PRIMARY KEY (user_id, event_id),
                             FOREIGN KEY (user_id) REFERENCES users(id),
                             FOREIGN KEY (event_id) REFERENCES events(id)
);

CREATE TABLE mentorships (
                             id INT AUTO_INCREMENT PRIMARY KEY,
                             mentor_id INT,
                             mentee_id INT,
                             started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                             FOREIGN KEY (mentor_id) REFERENCES users(id),
                             FOREIGN KEY (mentee_id) REFERENCES users(id)
);

CREATE TABLE connections (
                             id INT AUTO_INCREMENT PRIMARY KEY,
                             user_id_1 INT,
                             user_id_2 INT,
                             status ENUM('pending', 'accepted', 'blocked') DEFAULT 'pending',
                             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                             FOREIGN KEY (user_id_1) REFERENCES users(id),
                             FOREIGN KEY (user_id_2) REFERENCES users(id)
);

CREATE TABLE event_user (
                            id INT(11) AUTO_INCREMENT PRIMARY KEY,
                            user_id INT(11) NOT NULL,
                            event_id INT(11) NOT NULL,
                            joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            ADD COLUMN created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
                            ADD COLUMN updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

                            CONSTRAINT fk_event_user_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                            CONSTRAINT fk_event_user_event FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

CREATE TABLE mentors (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `user_id` int(11) NOT NULL,
                           `institution_id` int(11) DEFAULT NULL,
                           `club` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
                           `expertise` text COLLATE utf8mb4_general_ci DEFAULT NULL,
                           `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
                           `updated_at` timestamp NULL DEFAULT NULL,
                           PRIMARY KEY (`id`),
                           KEY `user_id` (`user_id`),
                           KEY `fk_mentors_institution` (`institution_id`),
                           CONSTRAINT `mentors_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
                           CONSTRAINT `fk_mentors_institution` FOREIGN KEY (`institution_id`) REFERENCES `institutions` (`id`) ON DELETE SET NULL
)

CREATE TABLE mentor_requests (
                                 id INT AUTO_INCREMENT PRIMARY KEY,
                                 mentee_id INT NOT NULL,
                                 mentor_id INT NOT NULL,
                                 status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
                                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                 updated_at TIMESTAMP NULL DEFAULT NULL,
                                 FOREIGN KEY (mentee_id) REFERENCES users(id) ON DELETE CASCADE,
                                 FOREIGN KEY (mentor_id) REFERENCES users(id) ON DELETE CASCADE
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

INSERT INTO connections (user_id_1, user_id_2, status) VALUES
                                                           (1, 2, 'accepted'),
                                                           (1, 3, 'accepted'),
                                                           (2, 4, 'pending'),
                                                           (3, 4, 'accepted');

INSERT INTO events (name, date, location) VALUES
                                              ('Circle Launch Event', '2025-08-01', 'Sunway Hall A'),
                                              ('Peer Mentorship Kickoff', '2025-08-10', 'Online'),
                                              ('Tech Networking Day', '2025-08-20', 'Taylor\''s Auditorium');

INSERT INTO user_events (user_id, event_id) VALUES
                                                (1, 1),
                                                (1, 2),
                                                (2, 2),
                                                (3, 1),
                                                (3, 3),
                                                (4, 3);

INSERT INTO mentorships (mentor_id, mentee_id) VALUES
                                                   (1, 2),
                                                   (1, 3),
                                                   (4, 1);

-- User 1 shares interests with Users 2 and 3
INSERT INTO user_interests (user_id, interest_id) VALUES
                                                      (1, 5),
                                                      (1, 7),
                                                      (1, 10),

-- User 2 shares 5 and 7 with User 1
                                                      (2, 5),
                                                      (2, 7),
                                                      (2, 12),

-- User 3 shares 10 with User 1
                                                      (3, 10),
                                                      (3, 14),

-- User 4 has unique interests
                                                      (4, 20),
                                                      (4, 25),

-- User 5 shares 14 with User 3
                                                      (5, 14),
                                                      (5, 30),

-- User 6 shares 25 with User 4
                                                      (6, 25),
                                                      (6, 31),

-- Fill up to 20 entries with some variety
                                                      (1, 15),
                                                      (2, 18),
                                                      (3, 22),
                                                      (4, 24),
                                                      (5, 26),
                                                      (6, 28);

CREATE TABLE match_requests (
                                id INT AUTO_INCREMENT PRIMARY KEY,
                                sender_id INT NOT NULL,
                                receiver_id INT NOT NULL,
                                status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
                                created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
                                updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

                                INDEX idx_sender (sender_id),
                                INDEX idx_receiver (receiver_id),

                                CONSTRAINT fk_sender FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
                                CONSTRAINT fk_receiver FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO match_requests (sender_id, receiver_id, status, created_at, updated_at)
VALUES
    (2, 1, 'pending', NOW(), NOW()),
    (3, 1, 'pending', NOW(), NOW()),
    (4, 1, 'pending', NOW(), NOW());

INSERT INTO events (
    creator_id, name, description, start_time, end_time, location, created_at, updated_at
) VALUES (
             1, -- replace with actual user ID from your `users` table
             'Circle Mixer: Speed Friending Edition',
             'A fast-paced event to meet new peers, share interests, and expand your Circle connections!',
             '2025-07-25 18:00:00',
             '2025-07-25 20:00:00',
             'University Hall, Room B',
             NOW(),
             NOW()
         );

-- Insert sample mentor data (users with IDs 4 and 5)
INSERT INTO mentors (user_id, institution, club, expertise)
VALUES
    (4, 'University of Example', 'Coding Club', 'Web Development, React, Laravel'),
    (5, 'Tech State College', 'AI Society', 'Machine Learning, Python, Data Analysis');

INSERT INTO mentor_requests (mentee_id, mentor_id, status, created_at, updated_at)
VALUES
    (6, 1, 'pending', NOW(), NOW());
