import React from 'react';

interface AddExpenseEventoModalProps {
  abierto: boolean;
  onClose: () => void;
}

const AddExpenseEventoModal: React.FC<AddExpenseEventoModalProps> = ({ abierto, onClose }) => {
  if (!abierto) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">×</button>
        <h2 className="modal-title">Agregar gasto</h2>
        {/* Aquí irá el formulario para agregar gasto */}
        <div className="flex gap-3 mt-4">
          <button className="btn-emerald btn-block" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default AddExpenseEventoModal; 