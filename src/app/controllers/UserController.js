import User from '../schemas/User';

class UserController {
  async store(req, res) {
    try {
      const userExists = await User.findOne({ registry: req.body.registry });

      if (userExists) {
        return res.status(400).json({ error: 'Usuário já existe ' });
      }

      const user = await User.create(req.body);
      const { name, email, registry } = user;

      return res.json({
        user: {
          name,
          email,
          registry,
        },
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async update(req, res) {
    try {
      const { oldPassword } = req.body;
      const user = await User.findById(req.userId);

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res.status(400).json({ error: 'Senha antiga incorreta' });
      }

      const { registry, name, email } = await User.findByIdAndUpdate(
        req.userId,
        req.body,
        { new: true }
      );

      return res.send({
        user: {
          registry,
          name,
          email,
        },
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async delete(req, res) {
    try {
      await User.findByIdAndUpdate(req.userId, { active: false });
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}

export default new UserController();
