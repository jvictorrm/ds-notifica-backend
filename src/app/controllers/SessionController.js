import jwt from 'jsonwebtoken';
import User from '../schemas/User';
import jwtConfig from '../../config/jwt';

class SessionController {
  async store(req, res) {
    try {
      const { registry, password } = req.body;
      const user = await User.findByCredentials(registry, password);

      if (!user) {
        return res.status(400).json({ error: 'Usuário/Senha inválidos' });
      }

      const { _id, name, email } = user;

      return res.json({
        user: {
          _id,
          registry,
          name,
          email,
        },
        token: jwt.sign({ id: _id }, jwtConfig.secret, {
          expiresIn: jwtConfig.expiresIn,
        }),
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}

export default new SessionController();
