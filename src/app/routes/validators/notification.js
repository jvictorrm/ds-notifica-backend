import * as Yup from 'yup';
import { cpf, cnpj } from 'cpf-cnpj-validator';

export default {
  index: async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
      const schema = Yup.object()
        .noUnknown(true, 'Foi passado um campo não permitido na query')
        .shape({
          name: Yup.string(),
          corporate_name: Yup.string(),
          business_branch: Yup.string(),
          legal_foundation: Yup.string(),
          canceled: Yup.boolean().default(false),
          page: Yup.number(),
        });

      try {
        await schema.validate(req.query, { stripUnknown: false });
        return next();
      } catch (error) {
        const { type, path, message } = error;
        return res
          .status(400)
          .json({ error: `[${type}] '${path}': ${message}` });
      }
    }
    return next();
  },

  store: async (req, res, next) => {
    const schema = Yup.object()
      .noUnknown(
        true,
        'Foi passado um campo não permitido ao corpo de requisição'
      )
      .shape({
        furniture_registration: Yup.string()
          .matches(
            '^([0-9]{9})$',
            'Tamanho correto de Inscrição Mobiliária: 999999999'
          )
          .test(
            'isFurniture',
            'Endereço de Correspondência é obrigatório',
            function() {
              const { furniture_registration, mail_address } = this.parent;
              if (!furniture_registration && !mail_address) return false;
              return true;
            }
          ),
        name: Yup.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
        cpf_cnpj: Yup.string().test('isCpfCnpj', 'CPF/CNPJ inválido', function(
          value
        ) {
          if (value && (!cpf.isValid(value) || !cnpj.isValid(value)))
            return false;
          return true;
        }),
        process_number: Yup.string(),
        corporate_name: Yup.string(),
        business_branch: Yup.string(),
        legal_foundation: Yup.string(),
        shipping_type: Yup.string()
          .required('Tipo de Remessa é obrigatório')
          .oneOf(
            ['CE', 'EDITAL', 'PESSOAL', 'JURIDICA'],
            'Tipo de Remessa informada inválida. Opções: ${values}'
          ),
        description: Yup.string(),
        mail_address: Yup.string(),
        second_user: Yup.string(),
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
        furniture_registration: Yup.string().matches(
          '^([0-9]{9})$',
          'Tamanho correto de Inscrição Mobiliária: 999999999'
        ),
        name: Yup.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
        cpf_cnpj: Yup.string().test('isCpfCnpj', 'CPF/CNPJ inválido', function(
          value
        ) {
          if (value && (!cpf.isValid(value) || !cnpj.isValid(value)))
            return false;
          return true;
        }),
        process_number: Yup.string(),
        corporate_name: Yup.string(),
        business_branch: Yup.string(),
        legal_foundation: Yup.string(),
        shipping_type: Yup.string().oneOf(
          ['CE', 'EDITAL', 'PESSOAL', 'JURIDICA'],
          'Tipo de Remessa informada inválida. Opções: ${values}'
        ),
        description: Yup.string(),
        second_user: Yup.string(),
        mail_address: Yup.string(),
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
