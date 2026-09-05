-- Seed data for local development. Assumes schema.sql was just run
-- (empty users/rides tables) — no DROP/TRUNCATE here, safe to run once
-- against a fresh schema.
--
-- Test login: username "waddle", password "password123"

INSERT INTO "users" ("username", "email", "password_hash", "full_name")
VALUES (
  'waddle',
  'admin@admin.com',
  '$argon2id$v=19$m=65536,p=4,t=3$qq/E/sjaJZIyB1AsjHU1QA$EnFN0wKGAk5YFusM2QFsdm/o3/J0q2Rrq8wOoYbEABU',
  'Jesus Rodriguez-Luna'
);

-- Dates are anchored to the Monday of the current week (Postgres's
-- date_trunc('week', ...) starts weeks on Monday) so this stays fresh no
-- matter when it's run. Each row is "N days before/after that Monday",
-- chosen to preserve the intended day of week.
--
-- 25 rides over 8 weeks. Week -4 (4 weeks back) is a full rest week
-- (broken streak). Current week is partial: rides Mon/Wed, nothing today
-- or the rest of the week.
INSERT INTO "rides"
  ("user_id", "title", "description", "distance", "avg_speed", "avg_power", "duration_seconds", "elevation_gain", "ride_type", "xp_earned", "ride_date")
VALUES
  -- 7 weeks back
  ((select id from users where username = 'waddle'), 'Morning Commute', 'Easy spin to the office.', 9.8, 15.1, 188, 2340, 140, 'Road', NULL, date_trunc('week', CURRENT_DATE)::date - 48), -- Tue
  ((select id from users where username = 'waddle'), 'Evening Commute', 'Quick ride home, legs felt good.', 12.4, 16.2, 182, 2760, 175, 'Road', NULL, date_trunc('week', CURRENT_DATE)::date - 46), -- Thu
  ((select id from users where username = 'waddle'), 'Gravel Adventure', 'Explored the fire roads out past the reservoir.', 41.6, 14.7, 202, 10200, 2050, 'Gravel', NULL, date_trunc('week', CURRENT_DATE)::date - 44), -- Sat

  -- 6 weeks back
  ((select id from users where username = 'waddle'), 'Morning Commute', 'Cool morning, easy effort.', 8.6, 14.3, 172, 2160, 130, 'Road', NULL, date_trunc('week', CURRENT_DATE)::date - 42), -- Mon
  ((select id from users where username = 'waddle'), 'Indoor Trainer Ride', 'Rain outside, trainer session instead.', 18.2, 19.9, 218, 3300, 0, 'Indoor', NULL, date_trunc('week', CURRENT_DATE)::date - 40), -- Wed
  ((select id from users where username = 'waddle'), 'Evening Commute', 'Tired legs but made good time.', 11.3, 16.1, 196, 2520, 160, 'Road', NULL, date_trunc('week', CURRENT_DATE)::date - 38), -- Fri
  ((select id from users where username = 'waddle'), 'Sunday Long Ride', 'Big loop out to the coast and back.', 54.8, 16.4, 214, 12000, 3350, 'Road', NULL, date_trunc('week', CURRENT_DATE)::date - 36), -- Sun

  -- 5 weeks back
  ((select id from users where username = 'waddle'), 'Morning Commute', 'Legs a little sore from Sunday.', 13.2, 16.5, 178, 2880, 195, 'Road', NULL, date_trunc('week', CURRENT_DATE)::date - 34), -- Tue
  ((select id from users where username = 'waddle'), 'Evening Commute', 'Short and easy.', 8.1, 13.9, 163, 2100, 105, 'Road', NULL, date_trunc('week', CURRENT_DATE)::date - 32), -- Thu
  ((select id from users where username = 'waddle'), 'Saturday Gravel Loop', 'Muddy after last night''s rain.', 37.9, 15.2, 198, 9000, 1880, 'Gravel', NULL, date_trunc('week', CURRENT_DATE)::date - 30), -- Sat
  ((select id from users where username = 'waddle'), 'Sunday Recovery Ride', 'Kept it easy after Saturday''s ride.', 30.4, 15.2, 188, 7200, 1480, 'Road', NULL, date_trunc('week', CURRENT_DATE)::date - 29), -- Sun

  -- 4 weeks back: full rest week, no rides.

  -- 3 weeks back
  ((select id from users where username = 'waddle'), 'Morning Commute', 'Back at it after a week off.', 13.7, 16.4, 198, 3000, 205, 'Road', NULL, date_trunc('week', CURRENT_DATE)::date - 21), -- Mon
  ((select id from users where username = 'waddle'), 'Indoor Trainer Ride', 'Squeezed in a session before work.', 20.4, 20.4, 228, 3600, 0, 'Indoor', NULL, date_trunc('week', CURRENT_DATE)::date - 19), -- Wed
  ((select id from users where username = 'waddle'), 'Evening Commute', 'Easy spin home.', 9.6, 14.4, 183, 2400, 150, 'Road', NULL, date_trunc('week', CURRENT_DATE)::date - 17), -- Fri
  ((select id from users where username = 'waddle'), 'Century Prep Ride', 'Longest ride in a while, felt strong.', 64.3, 16.1, 222, 14400, 4150, 'Road', NULL, date_trunc('week', CURRENT_DATE)::date - 16), -- Sat

  -- 2 weeks back
  ((select id from users where username = 'waddle'), 'Morning Commute', 'Legs still tired from Saturday.', 9.2, 14.9, 168, 2220, 128, 'Road', NULL, date_trunc('week', CURRENT_DATE)::date - 13), -- Tue
  ((select id from users where username = 'waddle'), 'Evening Commute', 'Good tempo on the way home.', 11.9, 16.2, 192, 2640, 172, 'Road', NULL, date_trunc('week', CURRENT_DATE)::date - 11), -- Thu
  ((select id from users where username = 'waddle'), 'Saturday Gravel Loop', 'Hit the climbs out past the ridge.', 47.5, 15.8, 208, 10800, 2580, 'Gravel', NULL, date_trunc('week', CURRENT_DATE)::date - 9), -- Sat
  ((select id from users where username = 'waddle'), 'Sunday Long Ride', 'Steady pace, nice weather.', 32.8, 15.1, 193, 7800, 1690, 'Road', NULL, date_trunc('week', CURRENT_DATE)::date - 8), -- Sun

  -- 1 week back
  ((select id from users where username = 'waddle'), 'Morning Commute', 'Cool start to the week.', 10.8, 15.1, 179, 2580, 158, 'Road', NULL, date_trunc('week', CURRENT_DATE)::date - 7), -- Mon
  ((select id from users where username = 'waddle'), 'Indoor Trainer Ride', 'Rain again, trainer it is.', 15.3, 19.1, 212, 2880, 0, 'Indoor', NULL, date_trunc('week', CURRENT_DATE)::date - 5), -- Wed
  ((select id from users where username = 'waddle'), 'Evening Commute', 'Fast one, tailwind helped.', 12.9, 16.8, 197, 2760, 182, 'Road', NULL, date_trunc('week', CURRENT_DATE)::date - 3), -- Fri
  ((select id from users where username = 'waddle'), 'Sunday Long Ride', 'Last big ride before the busy week.', 59.7, 15.9, 224, 13500, 3780, 'Road', NULL, date_trunc('week', CURRENT_DATE)::date - 1), -- Sun

  -- Current week: partial pattern, nothing today or after.
  ((select id from users where username = 'waddle'), 'Morning Commute', 'Easy start to the week.', 10.1, 15.5, 186, 2340, 148, 'Road', NULL, date_trunc('week', CURRENT_DATE)::date + 0), -- Mon
  ((select id from users where username = 'waddle'), 'Evening Commute', 'Quick ride, nothing today after this.', 12.2, 16.6, 191, 2640, 178, 'Road', NULL, date_trunc('week', CURRENT_DATE)::date + 2); -- Wed
