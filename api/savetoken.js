const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Only POST allowed' });

  const { token } = req.body;
  if (!token) return res.status(400).json({ message: 'Token required' });

  const filePath = path.join(__dirname, '../../db.json');
  let db = [];

  try {
    if (fs.existsSync(filePath)) {
      db = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    db.push({ token });
    fs.writeFileSync(filePath, JSON.stringify(db, null, 2));
    return res.status(200).json({ message: 'Token saved!' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to save token', error: err.message });
  }
};
