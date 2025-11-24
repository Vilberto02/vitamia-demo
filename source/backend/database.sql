CREATE DATABASE IF NOT EXISTS vitamia_db;
USE vitamia_db;

-- Tabla de recetas
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

-- Ejemplo de inserción de recetas
INSERT INTO recetas (titulo, tipo, tiempo_preparacion, descripcion, beneficios, ingredientes, procedimiento, imagen) VALUES
('Avena rápida', 'desayuno', '10 min', 'Avena fácil para empezar el día', 'Fuente de energía y fibra', 'Avena, leche, fruta', 'Mezclar y calentar', 'avena.jpg');

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  correo VARCHAR(100) UNIQUE NOT NULL,
  contrasena VARCHAR(255) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  meta VARCHAR(255),
  peso FLOAT NOT NULL,
  altura FLOAT NOT NULL,
  imc FLOAT NOT NULL,
  imagen VARCHAR(255)
);

-- Tabla de alimentos
CREATE TABLE IF NOT EXISTS alimentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  unidad VARCHAR(50) NOT NULL,
  tipo VARCHAR(50)
);

-- Ejemplo de inserción de alimentos
INSERT INTO alimentos (nombre, unidad, tipo) VALUES
('Manzana', 'unidad', 'fruta'),
('Banana', 'unidad', 'fruta'),
('Arroz', 'gramos', 'cereal'),
('Pollo', 'gramos', 'proteína');

-- Tabla de consumo
CREATE TABLE IF NOT EXISTS consumo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_alimento INT NOT NULL,
  id_usuario INT NOT NULL,
  id_tipo_comida INT,
  cantidad INT NOT NULL,
  fecha DATE NOT NULL,
  FOREIGN KEY (id_alimento) REFERENCES alimentos(id),
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

-- Tabla de información nutricional
CREATE TABLE IF NOT EXISTS informacion_nutricional (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  descripcion TEXT NOT NULL,
  beneficio TEXT NOT NULL,
  imagen VARCHAR(255)
);

-- Ejemplo de inserción de información nutricional
INSERT INTO informacion_nutricional (titulo, descripcion, beneficio, imagen) VALUES
('Mantente hidratado', 'Bebe al menos 2 litros de agua al día', 'Mejora tu digestión y mantiene tu piel saludable', 'agua.jpg'),
('Come más frutas', 'Incorpora 5 porciones de frutas y verduras diarias', 'Obtendrás vitaminas esenciales para tu cuerpo', 'frutas.jpg');