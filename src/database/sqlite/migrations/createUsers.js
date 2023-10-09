const createUsers = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    created_at TIMESTAMPE DEFAULT CURRENT_TIMESTAMP,
    is_admin BOOLEAN
  )
`;

module.exports = createUsers;
