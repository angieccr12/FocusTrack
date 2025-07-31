-- Crear tabla de usuarios
CREATE TABLE "User" (
    userId SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- Crear tabla de aplicaciones
CREATE TABLE "App" (
    appId SERIAL PRIMARY KEY,
    appName VARCHAR(100) NOT NULL
);

-- Crear tabla de dispositivos
CREATE TABLE "Device" (
    deviceId SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL,
    deviceType VARCHAR(50) NOT NULL,
    deviceName VARCHAR(100),
    FOREIGN KEY (userId) REFERENCES "User"(userId) ON DELETE CASCADE
);

-- Crear tabla de registros de actividad
CREATE TABLE "ActivityRecord" (
    recordId SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL,
    appId INTEGER NOT NULL,
    deviceId INTEGER NOT NULL,
    date DATE NOT NULL,
    startTime TIME NOT NULL,
    endTime TIME NOT NULL,
    duration INTERVAL,  -- O puedes eliminar este campo si decides calcularlo
    FOREIGN KEY (userId) REFERENCES "User"(userId) ON DELETE CASCADE,
    FOREIGN KEY (appId) REFERENCES "App"(appId) ON DELETE CASCADE,
    FOREIGN KEY (deviceId) REFERENCES "Device"(deviceId) ON DELETE CASCADE
);
