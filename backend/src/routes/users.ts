import { prisma } from '@/lib/prisma';
import { authenticateToken } from '@/middleware/auth';
import { Router } from 'express';


const router = Router();

// Get user details
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error });
  }
});

// Update user information
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const { email, firstName, lastName, role } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        email,
        firstName,
        lastName,
        role,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
});

// Export the router
export default router;