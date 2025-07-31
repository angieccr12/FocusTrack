-- Usuarios
INSERT INTO User (email, password) VALUES
('alice@example.com', 'alicepass'),
('bob@example.com', 'bobpass');

-- Dispositivos
INSERT INTO Device (userId, deviceType, deviceName) VALUES
(1, 'Smartphone', 'Samsung Galaxy S21'),
(1, 'Laptop', 'Dell XPS 13'),
(2, 'Tablet', 'iPad Air');

-- Aplicaciones
INSERT INTO App (appName) VALUES
('Instagram'),
('Notion'),
('Spotify');

-- Registros de actividad
INSERT INTO ActivityRecord (appId, deviceId, date, startTime, endTime) VALUES
(1, 1, '2025-07-30', '10:00:00', '10:30:00'),
(2, 2, '2025-07-30', '11:00:00', '11:45:00'),
(3, 3, '2025-07-31', '14:00:00', '15:00:00');
