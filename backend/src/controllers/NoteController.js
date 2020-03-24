const connection = require('../database/connection');
const { randomBytes } = require('crypto');

module.exports = {
  async create(req, res) {
    const { description, title } = req.body;
    const user_id = req.headers.authorization;
    const id = randomBytes(4).toString('HEX');

    await connection('notes').insert({ description, id, title, user_id });

    return res.json({ id });
  },


  async delete(req, res) {
    const { id } = req.params;
    const user_id = req.headers.authorization;

    const note = await connection('notes').where('id', id).select('user_id').first();
    if (!note) return res.status(404).send();

    if (note.user_id !== user_id) {
      return res.status(401).json({ error: 'Operation not permitted.' });
    }

    await connection('notes').where('id', id).delete();

    return res.status(204).send();
  },

  async index(req, res) {
    const notes = await connection('notes').select('*');
    return res.json(notes);
  }
};
