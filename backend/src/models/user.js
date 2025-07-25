const pool = require('../db');

async function findOrCreateUser(telegram_id, language) {
  const res = await pool.query(
    'SELECT * FROM users WHERE telegram_id = $1',
    [telegram_id]
  );
  if (res.rows.length) return res.rows[0];
  const insert = await pool.query(
    'INSERT INTO users (telegram_id, language) VALUES ($1, $2) RETURNING *',
    [telegram_id, language]
  );
  return insert.rows[0];
}

module.exports = { findOrCreateUser };
