import express from 'express';
import db from '../config/db.js';
import bcrypt from 'bcrypt';
const router = express.Router();

// ✅ Get All Users
router.get('/', async (req, res) => {
  try {
    const [results] = await db.promise().query('SELECT * FROM Users');

    if (results.length === 0) {
      return res.status(404).json({ message: 'There are no Users' });
    }

    res.json(results);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ Create User
router.post('', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Check if user already exists
    const [existingUser] = await db
      .promise()
      .query('SELECT * FROM Users WHERE email = ?', [email]);

    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const [result] = await db
      .promise()
      .query(
        'INSERT INTO Users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)',
        [firstName, lastName, email, hashedPassword]
      );

    res
      .status(201)
      .json({ message: 'User created successfully', userId: result.insertId });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ Update User
router.put('/:id', async (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, password } = req.body;

  try {
    const [results] = await db
      .promise()
      .query(
        'UPDATE Users SET firstName = ?, lastName = ?,   password = ? WHERE id = ?',
        [firstName, lastName, password, userId]
      );

    console.log(results);
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ Delete a user by ID
router.delete('/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const [results] = await db
      .promise()
      .query('DELETE FROM Users WHERE id = ?', [userId]);

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
