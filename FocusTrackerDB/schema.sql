-- Tabla: User
CREATE TABLE "User" (
    userId SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

-- Tabla: App
CREATE TABLE App (
    appId SERIAL PRIMARY KEY,
    appName VARCHAR(100) NOT NULL
);

-- Tabla: Device
CREATE TABLE Device (
    deviceId SERIAL PRIMARY KEY,
    deviceType VARCHAR(50),
    deviceName VARCHAR(100)
);

-- Tabla: ActivityRecord
CREATE TABLE ActivityRecord (
    recordId SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL,
    appId INTEGER NOT NULL,
    deviceId INTEGER NOT NULL,
    date DATE NOT NULL,
    startTime TIME NOT NULL,
    endTime TIME NOT NULL,
    duration INTERVAL NOT NULL,

    -- Llaves foráneas
    CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES "User"(userId) ON DELETE CASCADE,
    CONSTRAINT fk_app FOREIGN KEY (appId) REFERENCES App(appId) ON DELETE CASCADE,
    CONSTRAINT fk_device FOREIGN KEY (deviceId) REFERENCES Device(deviceId) ON DELETE CASCADE
);
