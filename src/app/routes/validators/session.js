import * as Yup from 'yup';

export default {
  store: async (req, res, next) => {
    const schema = Yup.object()
      .noUnknown(
        true,
        'Foi passado um campo não permitido ao corpo de requisição'
      )
      .shape({
        registry: Yup.string().required('Código da Matrícula é obrigatório'),
        password: Yup.string().required('Senha é obrigatória'),
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
