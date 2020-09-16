import { promisify } from 'util';
import jwt from 'jsonwebtoken';

export const generateToken = (payload) => {
  const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
  });

  return token;
};

export const verifyToken = async (token) => {
  const data = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  return data;
};
