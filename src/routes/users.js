import express from 'express';
const router = express.Router();
import {
  getAllUser,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
} from '../controllers/userController.js';

import authenticate from '../../middlewares/authMiddleware.js';

// ✅ Get All Users
router.get('/', getAllUser);

// ✅ Create User
router.post('/register', registerUser);

// ✅ Update User
router.put('/:id', updateUser);

// ✅ Delete a user by ID
router.delete('/:id', deleteUser);

// Login and Register

router.post('/login', loginUser);

router.get('/profile', authenticate, (req, res) => {
  res.json({ message: 'User profile data', user: req.user });
});

router.get('/orders', authenticate, (req, res) => {
  res.send('User orders data');
});

export default router;
