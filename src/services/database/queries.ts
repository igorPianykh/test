export const selectByEmailQuery = `
          SELECT * FROM Users WHERE email = ?;
        `;
export const insertRegistrationQuery = `
            INSERT INTO Users (id, name, email, password)
            VALUES (?, ?, ?, ?);
          `;
export const selectByEmailPasswordQuery = `
          SELECT * FROM Users WHERE email = ? AND password = ?;
        `;

export const createUsersTableQuery = `
          CREATE TABLE IF NOT EXISTS Users (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
          );
        `;

export const createMeasurementsTableQuery = `
          CREATE TABLE IF NOT EXISTS Measurements (
            id TEXT PRIMARY KEY,
            userId TEXT NOT NULL,
            sys REAL NOT NULL,
            dia REAL NOT NULL,
            pulse REAL NOT NULL,
            timestamp TEXT NOT NULL,
            FOREIGN KEY (userId) REFERENCES Users (id)
          );
        `;

export const insertMeasurementQuery = `
    INSERT INTO Measurements (id, userId, sys, dia, pulse, timestamp)
    VALUES (?, ?, ?, ?, ?, ?);
  `;

export const selectMeasurementsQuery = `
    SELECT * FROM Measurements WHERE userId = ? ORDER BY timestamp DESC;
  `;
