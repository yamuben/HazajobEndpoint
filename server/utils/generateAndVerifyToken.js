import jwt from 'jsonwebtoken';

export const generateToken = (payload) => {
  const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
  });

  return token;
};

export const VerifyToken = (token) => {
  const data = jwt.verify(token, process.env.JWT_SECRET);

  return data;
};
