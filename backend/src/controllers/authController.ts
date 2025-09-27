// src/services/authService.ts
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
 
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'; // use algo forte em produção

export async function registerUser(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) {
  const { email, password, firstName, lastName } = data;

	console.log(email, password, firstName, lastName);
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
		throw new Error('Usuário já registrado com esse e-mail.');
  }
	console.log('aqui');
	
  const hashedPassword = await bcrypt.hash(password, 10);
	
	console.log('aqui 2');
  const user = await prisma.user.create({
		data: {
			email,
      password: hashedPassword,
      firstName,
      lastName,
    },
  });
	console.log('aqui 3');

  // Remove a senha do retorno
  const { password: _, ...safeUser } = user;
  return safeUser;
}

export async function loginUser(data: { email: string; password: string }) {
  const { email, password } = data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Credenciais inválidas.');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Credenciais inválidas.');
  }

  // Atualiza último login
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  });

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  return token;
}
