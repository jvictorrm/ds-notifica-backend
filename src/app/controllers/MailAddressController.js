import MailAddress from '../schemas/MailAddress';

class MailAddressController {
  async store(req, res) {
    try {
      const mailAddress = await MailAddress.create(req.body);
      const {
        _id,
        street,
        number,
        complement,
        neighbourhood,
        city,
        state,
        zip_code,
        reference,
      } = mailAddress;

      return res.send({
        mailAddress: {
          _id,
          street,
          number,
          complement,
          neighbourhood,
          city,
          state,
          zip_code,
          reference,
        },
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async update(req, res) {
    try {
      const mailAddress = await MailAddress.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      const {
        _id,
        street,
        number,
        complement,
        neighbourhood,
        city,
        state,
        zip_code,
        reference,
      } = mailAddress;

      return res.send({
        mailAddress: {
          _id,
          street,
          number,
          complement,
          neighbourhood,
          city,
          state,
          zip_code,
          reference,
        },
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}

export default new MailAddressController();
