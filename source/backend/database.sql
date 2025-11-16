CREATE DATABASE IF NOT EXISTS vitamia_db;
USE vitamia_db;

CREATE TABLE IF NOT EXISTS recetas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  tipo ENUM('desayuno', 'almuerzo', 'cena', 'snack') NOT NULL,
  tiempo_preparacion VARCHAR(50) NOT NULL,
  descripcion TEXT,
  beneficios TEXT,
  ingredientes TEXT,
  procedimiento TEXT,
  imagen VARCHAR(255)
);

-- Ejemplo de inserción
INSERT INTO recetas (titulo, tipo, tiempo_preparacion, descripcion, beneficios, ingredientes, procedimiento, imagen) VALUES
('Avena rápida', 'desayuno', '10 min', 'Avena fácil para empezar el día', 'Fuente de energía y fibra', 'Avena, leche, fruta', 'Mezclar y calentar', 'avena.jpg');

CREATE TABLE IF NOT EXISTS usuarios (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR (100) NOT NULL,
    apellido VARCHAR (100) NOT NULL,
    correo VARCHAR (100),
    imagen VARCHAR(255)
);

INSERT INTO usuarios (nombre, apellido, correo, imagen) VALUES 
('Luis', 'Romero', 'luis.romero@gmail.com', 'foto.jpg');