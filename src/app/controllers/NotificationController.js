import Notification from '../schemas/Notification';
import MailAddress from '../schemas/MailAddress';
import User from '../schemas/User';

class NotificationController {
  async index(req, res) {
    const { id } = req.params;
    if (id) {
      try {
        const notification = await Notification.findById(id)
          .select('-__v -updated_at')
          .populate('user', '-__v -updated_at -password')
          .populate('second_user', '-__v -updated_at -password')
          .populate('mail_address', '-__v -updated_at');

        return res.send({ notification });
      } catch (error) {
        return res.status(400).json({
          error: `Falha ao buscar Notificação pelo ID: ${error.message} `,
        });
      }
    }

    const { page = 1, perPage = 15 } = req.query;
    delete req.query.page;

    // string fields 'starts with' regex
    Object.keys(req.query).forEach(function(key) {
      req.query[key] =
        typeof req.query[key] === 'string'
          ? new RegExp(`^${req.query[key]}`, 'i')
          : req.query[key];
    });

    const notifications = await Notification.find(req.query)
      .select('-__v -updated_at')
      .populate('user', '-__v -updated_at -password')
      .populate('second_user', '-__v -updated_at -password')
      .populate('mail_address', '-__v -updated_at')
      .limit(perPage)
      .skip((page - 1) * perPage);

    return res.send({ notifications });
  }

  async store(req, res) {
    try {
      // verify mail_address
      if (
        req.body.mail_address &&
        !(await MailAddress.findById(req.body.mail_address))
      ) {
        return res
          .status(400)
          .json({ error: 'Endereço de Correspondência inexistente' });
      }

      // verify inspector
      if (
        req.body.second_user &&
        !(await User.findById(req.body.second_user))
      ) {
        return res.status(400).json({ error: 'Fiscal inexistente' });
      }

      const {
        _id,
        sequence,
        year,
        furniture_registration,
        name,
        cpf_cnpj,
        process_number,
        corporate_name,
        business_branch,
        legal_foundation,
        shipping_type,
        description,
        mail_address,
        user,
        second_user,
      } = await Notification.create({
        ...req.body,
        user: req.userId,
      });

      return res.status(200).json({
        notification: {
          _id,
          sequence,
          year,
          furniture_registration,
          name,
          cpf_cnpj,
          process_number,
          corporate_name,
          business_branch,
          legal_foundation,
          shipping_type,
          description,
          mail_address,
          user,
          second_user,
        },
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      // verify inspector
      if (
        req.body.second_user &&
        !(await User.findById(req.body.second_user))
      ) {
        return res.status(400).json({ error: 'Fiscal inexistente' });
      }

      const {
        sequence,
        year,
        furniture_registration,
        name,
        cpf_cnpj,
        process_number,
        corporate_name,
        business_branch,
        legal_foundation,
        shipping_type,
        description,
        mail_address,
        user,
        second_user,
      } = await Notification.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      });

      return res.send({
        notification: {
          _id: id,
          sequence,
          year,
          furniture_registration,
          name,
          cpf_cnpj,
          process_number,
          corporate_name,
          business_branch,
          legal_foundation,
          shipping_type,
          description,
          mail_address,
          user,
          second_user,
        },
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async delete(req, res) {
    try {
      await Notification.findByIdAndUpdate(req.query.id, { canceled: true });
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}

export default new NotificationController();
