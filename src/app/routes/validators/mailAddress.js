/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup';

export default {
  store: async (req, res, next) => {
    const schema = Yup.object()
      .noUnknown(
        true,
        'Foi passado um campo não permitido ao corpo de requisição'
      )
      .shape({
        street: Yup.string().required('Logradouro é obrigatório'),
        number: Yup.string(),
        complement: Yup.string(),
        neighbourhood: Yup.string().required('Bairro é obrigatório'),
        city: Yup.string().required('Cidade é obrigatório'),
        state: Yup.string().required('Estado é obrigatório'),
        zip_code: Yup.string().required('CEP é obrigatório'),
        reference: Yup.string(),
      });

    try {
      await schema.validate(req.body, { stripUnknown: false });
      return next();
    } catch (error) {
      const { type, path, message } = error;
      return res.status(400).json({ error: `[${type}] '${path}': ${message}` });
    }
  },

  update: async (req, res, next) => {
    const schema = Yup.object()
      .noUnknown(
        true,
        'Foi passado um campo não permitido ao corpo de requisição'
      )
      .shape({
        street: Yup.string(),
        number: Yup.string(),
        complement: Yup.string(),
        neighbourhood: Yup.string(),
        city: Yup.string(),
        state: Yup.string(),
        zip_code: Yup.string(),
        reference: Yup.string(),
      });

    try {
      await schema.validate(req.body, { stripUnknown: false });
      return next();
    } catch (error) {
      const { type, path, message } = error;
      return res.status(400).json({ error: `[${type}] '${path}': ${message}` });
    }
  },
};
