const db = require('../db');

const RecetaModelo = {
  async obtenerTodas() {
    const [rows] = await db.query('SELECT * FROM recetas');
    return rows;
  },
  async obtenerPorTipo(tipo) {
    const [rows] = await db.query('SELECT * FROM recetas WHERE tipo = ?', [tipo]);
    return rows;
  }
};

module.exports = RecetaModelo;
