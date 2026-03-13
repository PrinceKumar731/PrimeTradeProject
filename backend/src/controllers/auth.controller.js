import { loginUser, registerUser } from '../services/auth.service.js';

export const register = async (req, res) => {
  const result = await registerUser(req.body);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: result,
  });
};

export const login = async (req, res) => {
  const result = await loginUser(req.body);

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: result,
  });
};
