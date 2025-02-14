import express from 'express';
const router = express.Router();
import {
  getAllUser,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
} from '../controllers/userController.js';

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

export default router;
