-- CREACIÓN DE TABLAS

CREATE TABLE "User" (
    "userId" SERIAL PRIMARY KEY,
    "userEmail" VARCHAR(100) NOT NULL UNIQUE,
    "userPassword" VARCHAR(100) NOT NULL,
    "userFirstName" VARCHAR(50),
    "userLastName" VARCHAR(50)
);

CREATE TABLE "Device" (
    "deviceId" SERIAL PRIMARY KEY,
    "userId" INT REFERENCES "User"("userId"),
    "deviceType" VARCHAR(50),
    "deviceName" VARCHAR(100)
);

CREATE TABLE "App" (
    "appId" SERIAL PRIMARY KEY,
    "appName" VARCHAR(100) NOT NULL
);

CREATE TABLE "ActivityRecord" (
    "recordId" SERIAL PRIMARY KEY,
    "appId" INT REFERENCES "App"("appId"),
    "deviceId" INT REFERENCES "Device"("deviceId"),
    "recordDate" DATE NOT NULL,
    "startTime" TIME NOT NULL,
    "endTime" TIME NOT NULL
);

-- INSERCIONES

-- "User"
INSERT INTO "User" ("userEmail", "userPassword", "userFirstName", "userLastName") VALUES
('ana@example.com', 'passAna123', 'Ana', 'Martínez'),
('luis@example.com', 'passLuis456', 'Luis', 'Gómez'),
('sofia@example.com', 'passSofia789', 'Sofía', 'López');

-- "Device"
INSERT INTO "Device" ("userId", "deviceType", "deviceName") VALUES
(1, 'Smartphone', 'Galaxy S21'),
(2, 'Laptop', 'MacBook Pro'),
(3, 'Tablet', 'iPad Air');

-- "App"
INSERT INTO "App" ("appName") VALUES
('YouTube'),
('Instagram'),
('WhatsApp');

-- "ActivityRecord"
INSERT INTO "ActivityRecord" ("appId", "deviceId", "recordDate", "startTime", "endTime") VALUES
(1, 1, '2025-08-04', '08:00:00', '08:30:00'),
(2, 2, '2025-08-04', '10:15:00', '11:00:00'),
(3, 3, '2025-08-05', '14:45:00', '15:10:00');

