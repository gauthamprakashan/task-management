import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // TODO: If no token, respond with { error: "Access denied. No token provided." } and appropriate status code

    const jwtSecret = process.env.JWT_SECRET;

    // TODO: If JWT secret not set, respond with { error: "JWT secret not configured" } and appropriate status code

    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.userId);

    // TODO: If no user found for decoded userId, respond with { error: "Invalid token." } and appropriate status code

    req.user = user;
    next();
  } catch (error) {
    // TODO: On any JWT verification error, respond with { error: "Invalid token." } and appropriate status code
  }
};
