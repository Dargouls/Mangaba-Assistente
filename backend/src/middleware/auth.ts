import { prisma } from '@/lib/prisma';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, async (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
		
    const foundUser = await prisma.user.findUnique({ where: { id: (user as any)?.id } });
    if (!foundUser) {
      return res.sendStatus(404);
    }

    req.user = foundUser;
    next();
  });
};

export const protectRoute = (req: Request, res: Response, next: NextFunction) => {
  authenticateToken(req, res, next);
};