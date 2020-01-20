import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../schemas/User';

import jwtConfig from '../../config/jwt';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não informado' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, jwtConfig.secret);

    req.userId = decoded.id;
    const userActive = await User.findById({ _id: req.userId });

    if (!userActive.active) {
      return res.status(401).json({
        error:
          'Usuário não está ativado! Reative-o ou autentique-se com um usuário ativo para efetuar a operação',
      });
    }
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};
