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
        registry: Yup.string()
          .required('Código da Matrícula é obrigatório')
          .matches(
            '^([0-9]{6})$',
            'Tamanho correto de Código da Matrícula: 999999'
          ),
        name: Yup.string()
          .required('Nome é obrigatório')
          .min(3, 'Nome deve ter no mínimo ${min} caracteres'),
        password: Yup.string().required('Senha é obrigatória'),
        email: Yup.string()
          .required('Email é obrigatório')
          .email('Informe um email válido'),
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
        registry: Yup.string().matches(
          '^([0-9]{6})$',
          'Tamanho correto de Código da Matrícula: 999999'
        ),
        name: Yup.string().min(3, 'Nome deve ter no mínimo ${min} caracteres'),
        email: Yup.string().email('Informe um email válido'),
        password: Yup.string().test(
          'newPassword',
          'Informe a senha antiga',
          function() {
            const { password, oldPassword } = this.parent;
            if (password && !oldPassword) {
              return false;
            }
            return true;
          }
        ),
        rePassword: Yup.string().test(
          'reNewPassword',
          'Confirmação da senha está diferente de nova senha',
          function() {
            const { password, rePassword } = this.parent;
            if (!(password === rePassword)) {
              return false;
            }
            return true;
          }
        ),
        oldPassword: Yup.string(),
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
