<<<<<<< HEAD
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
=======
-- Tabla de usuarios
CREATE TABLE "User" (
    userId SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100)
);

-- Tabla de aplicaciones
CREATE TABLE "App" (
    appId SERIAL PRIMARY KEY,
    appName VARCHAR(100) NOT NULL UNIQUE
);

-- Tabla de dispositivos
CREATE TABLE "Device" (
    deviceId SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL,
    deviceType VARCHAR(50) NOT NULL,
    deviceName VARCHAR(100),
    FOREIGN KEY (userId) REFERENCES "User"(userId) ON DELETE CASCADE,
    CONSTRAINT unique_devicename_per_user UNIQUE (userId, deviceName)
);

-- Tabla de registros de actividad
CREATE TABLE "ActivityRecord" (
    recordId SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL,
    appId INTEGER NOT NULL,
    deviceId INTEGER NOT NULL,
    date DATE NOT NULL,
    startTime TIME NOT NULL,
    endTime TIME NOT NULL,
    duration INTERVAL,
    FOREIGN KEY (userId) REFERENCES "User"(userId) ON DELETE CASCADE,
    FOREIGN KEY (appId) REFERENCES "App"(appId) ON DELETE CASCADE,
    FOREIGN KEY (deviceId) REFERENCES "Device"(deviceId) ON DELETE CASCADE
);
>>>>>>> 12a2ecc (Agrega backend y esquema de base de datos)
