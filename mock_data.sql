-- Insert mock users (passwords are hashed version of 'password123')
INSERT INTO users (username, password, role, location, phone, email, credit_balance, created_at) VALUES
('john_farmer', '$2a$10$6lP.0YyCFqGqu9ipUgvgzOqVgBJ9w7Ptx405gKlKkgn73IHUNzqRi', 'farmer', 'Nakuru', '0712345678', 'john@example.com', 25.5, CURRENT_TIMESTAMP),
('mary_farmer', '$2a$10$6lP.0YyCFqGqu9ipUgvgzOqVgBJ9w7Ptx405gKlKkgn73IHUNzqRi', 'farmer', 'Kisumu', '0723456789', 'mary@example.com', 15.75, CURRENT_TIMESTAMP),
('david_verifier', '$2a$10$6lP.0YyCFqGqu9ipUgvgzOqVgBJ9w7Ptx405gKlKkgn73IHUNzqRi', 'verifier', 'Nairobi', '0734567890', 'david@example.com', 0, CURRENT_TIMESTAMP),
('sarah_admin', '$2a$10$6lP.0YyCFqGqu9ipUgvgzOqVgBJ9w7Ptx405gKlKkgn73IHUNzqRi', 'admin', 'Mombasa', '0745678901', 'sarah@example.com', 0, CURRENT_TIMESTAMP);

-- Insert mock projects
INSERT INTO projects (user_id, name, description, type, location, coordinates, status, created_at) VALUES
(1, 'Nakuru Tree Planting', 'Community tree planting initiative in Nakuru County', 'tree_planting', 'Nakuru Town', '-0.303099,36.080026', 'approved', CURRENT_TIMESTAMP),
(1, 'Biogas Installation', 'Family-size biogas digester installation', 'biogas', 'Nakuru Rural', '-0.393099,36.180026', 'pending', CURRENT_TIMESTAMP),
(2, 'Kisumu Conservation', 'Soil conservation and sustainable farming', 'conservation', 'Kisumu County', '-0.091702,34.767956', 'approved', CURRENT_TIMESTAMP),
(2, 'Solar Energy Project', 'Solar panel installation for clean energy', 'renewable', 'Kisumu Town', '-0.101702,34.757956', 'pending', CURRENT_TIMESTAMP);

-- Insert mock activities
INSERT INTO activities (project_id, description, photo_path, coordinates, status, credits, created_at) VALUES
(1, 'Planted 50 indigenous trees', '/uploads/sample_trees.jpg', '-0.303099,36.080026', 'approved', 25.0, CURRENT_TIMESTAMP),
(1, 'Maintenance and watering of planted trees', '/uploads/sample_maintenance.jpg', '-0.303099,36.080026', 'pending', 5.0, CURRENT_TIMESTAMP),
(2, 'Biogas digester construction phase 1', '/uploads/sample_biogas.jpg', '-0.393099,36.180026', 'pending', 10.0, CURRENT_TIMESTAMP),
(3, 'Implemented terracing for soil conservation', '/uploads/sample_terracing.jpg', '-0.091702,34.767956', 'approved', 15.0, CURRENT_TIMESTAMP);

-- Insert mock transactions
INSERT INTO transactions (user_id, amount, type, status, created_at) VALUES
(1, 25.0, 'credit', 'completed', CURRENT_TIMESTAMP),
(1, 10.0, 'withdrawal', 'completed', CURRENT_TIMESTAMP),
(2, 15.0, 'credit', 'completed', CURRENT_TIMESTAMP),
(2, 5.0, 'withdrawal', 'pending', CURRENT_TIMESTAMP); 