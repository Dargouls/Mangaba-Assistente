import { loginUser, registerUser } from '@/controllers/authController';
import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';

// Extend Express Request type to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const router = Router();

router.post('/register', async (req, res) => {
  try {
		console.log(req.body);
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const token = await loginUser(req.body);
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
});

// Example of a protected route
router.get('/profile', authenticateToken, (req, res) => {
  res.status(200).json(req.user);
});

export default router;