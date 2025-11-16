const db = require('../db');

const UsuarioModelo = {
  async obtenerUsuarios() {
    const [rows] = await db.query('SELECT * FROM usuarios');
    return rows;
  },
  async obtenerPorNombre(nombre) {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre]);
    return rows;
  }
};

module.exports = UsuarioModelo;