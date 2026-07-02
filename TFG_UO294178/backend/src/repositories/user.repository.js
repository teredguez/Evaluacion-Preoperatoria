const db = require("../../db");

async function inviteUser(email) {
  const query = `
    INSERT INTO users (email, name, role)
    VALUES ($1, 'Sanitario Pendiente', 'clinico')
    RETURNING id, email, role
  `;

  const result = await db.query(query, [email]);
  return result.rows[0];
}

async function getUsers() {
  const query = `
    SELECT id, name, email, role, active
    FROM users
    ORDER BY
      CASE
        WHEN role = 'admin' AND active = true THEN 0
        WHEN role <> 'admin' AND active = true THEN 1
        ELSE 2
      END,
      name ASC;
  `;

  const result = await db.query(query);
  return result.rows;
}

async function deleteUser(id) {
  await db.query(
    "DELETE FROM users WHERE id = $1",
    [id]
  );
}

async function getUserByEmail(email) {
  const query = `
    SELECT *
    FROM users
    WHERE email = $1
  `;

  const result = await db.query(query, [email]);
  return result.rows[0] || null;
}

async function activateUser(email, hashedPassword, name) {
  const query = `
    UPDATE users
    SET
      password = $1,
      active = true,
      name = $2
    WHERE email = $3
    RETURNING id, email, role, name, active
  `;

  const result = await db.query(query, [
    hashedPassword,
    name,
    email,
  ]);

  return result.rows[0] || null;
}

module.exports = {
  inviteUser,
  getUsers,
  deleteUser,
  getUserByEmail,
  activateUser,
};

