export default async (err, req, res, next) => {
  if (err instanceof SyntaxError)
    return res.status(400).json({ error: 'Erro na sintaxe do JSON' });
  next();
};
