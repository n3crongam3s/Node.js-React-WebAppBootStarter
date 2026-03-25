const db = require('../data/dataStore');

function getUsers(req, res) {
  try {
    const users = db.prepare("SELECT * FROM Users").all();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

function addUsers(req, res) {
  try {
    const { UserName } = req.body;

    const result = db
      .prepare("INSERT INTO Users (UserName) VALUES (?)")
      .run(UserName);

    res.json({ success: true, id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

function deleteUsers(req, res) {
  try {
    const { UserID } = req.body;

    const result = db
      .prepare("DELETE FROM Users WHERE UserID = ?")
      .run(UserID);

    res.json({ success: true, deleted: result.changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getUsers, addUsers, deleteUsers };
