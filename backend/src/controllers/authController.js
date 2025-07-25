const { findOrCreateUser } = require('../models/user');

async function register(req, res) {
  const { telegram_id, language } = req.body;
  if (!telegram_id) return res.status(400).json({ error: 'telegram_id required' });
  try {
    const user = await findOrCreateUser(telegram_id, language || 'ru');
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { register };
