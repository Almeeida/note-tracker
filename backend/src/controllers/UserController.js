const connection = require('../database/connection');

module.exports = {
  async create(req, res) {
    const { email, name, password } = req.body;

    const [id] = await connection('users').insert({ email, name, password });

    return res.json({ id });
  },
  async index(req, res) {
    const users = await connection('users').select('*');

    return res.json(users);
  }
}
