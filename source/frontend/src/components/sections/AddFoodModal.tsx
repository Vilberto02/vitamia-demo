
import React, { useState } from "react";

// --- NUEVO ---
// 1. Define el tipo de dato que este componente ENVIARÁ
interface FoodData {
  nombre: string;
  cantidad: number;
  unidad: string;
}

// --- MODIFICADO ---
// 2. Actualiza las props: onSubmit ahora espera recibir los datos
interface AddFoodModalProps {
  onClose: () => void;
  onSubmit: (foodData: FoodData) => void; 
}

const AddFoodModal: React.FC<AddFoodModalProps> = ({ onClose, onSubmit }) => {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [unidad, setUnidad] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // --- MODIFICADO ---
    // 3. Crea el objeto con los datos del estado del formulario
    const foodData: FoodData = {
      nombre: nombre,
      cantidad: parseFloat(cantidad) || 0, // Convierte el string a número
      unidad: unidad,
    };

    // 4. Llama a la función onSubmit (que vino del padre) con los datos
    onSubmit(foodData);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/30  flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Alimento</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl"
          >
            &times;
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Escribe los datos del alimento o ingrediente.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nombre del alimento.
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="cantidad"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Cantidad del alimento.
            </label>
            <input
              type="number" // <-- Es buena idea cambiar esto a "number"
              id="cantidad"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="unidad"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Unidad del alimento.
            </label>
            <input
              type="text"
              id="unidad"
              value={unidad}
              onChange={(e) => setUnidad(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Ej: gramos, unidad, ml"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 font-semibold"
          >
            Listo
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddFoodModal;
