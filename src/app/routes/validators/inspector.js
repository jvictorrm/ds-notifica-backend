import * as Yup from 'yup';

export default {
  index: async (req, res, next) => {
    const schema = Yup.object()
      .noUnknown(true, 'Foi passado um campo não permitido na query')
      .shape({
        registry: Yup.string().required('Código da Matrícula é obrigatório'),
      });

    try {
      await schema.validate(req.query, { stripUnknown: false });
      return next();
    } catch (error) {
      const { type, path, message } = error;
      return res.status(400).json({ error: `[${type}] '${path}': ${message}` });
    }
  },
};
