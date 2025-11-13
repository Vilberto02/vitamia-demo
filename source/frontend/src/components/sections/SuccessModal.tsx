
import React from "react";

interface SuccessModalProps {
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/30 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h2 className="text-xl font-semibold mb-2">Alimento agregado</h2>
        <p className="text-sm text-gray-600 mb-6">
          El alimento ha sido agregado exitosamente.
        </p>
        <button
          onClick={onClose}
          className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 font-semibold"
        >
          Ok
        </button>
      </div>
    </div>
  );
};
export default SuccessModal;
