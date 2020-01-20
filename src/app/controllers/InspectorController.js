import User from '../schemas/User';

class InspectorController {
  async index(req, res) {
    const { registry } = req.query;
    const inspector = await User.findOne({ registry }).select(
      '-__v -updated_at -password'
    );

    if (!inspector) {
      return res.status(400).json({ error: 'Fiscal não existe' });
    }

    if (!inspector.active) {
      return res.status(400).json({ error: 'Fiscal não está ativo' });
    }

    return res.send({ inspector });
  }
}

export default new InspectorController();
