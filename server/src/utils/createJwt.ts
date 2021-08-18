import jwt from "jsonwebtoken";
import {UserStoredInToken} from '../interfaces/auth.interface'

const createJwt = (user: UserStoredInToken) => {
  const payload = {
    user: user
  };

  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export default createJwt;
