import React from 'react';
import { Evento } from '../context/EventoContext';

interface EventoCardProps {
  evento: Evento;
  onVerDetalles: () => void;
  onEditar: () => void;
  onAgregarGasto: () => void;
  onEliminar: () => void;
}

const EventoCard: React.FC<EventoCardProps> = ({ evento, onVerDetalles, onEditar, onAgregarGasto, onEliminar }) => {
  return (
    <div className="card mb-4 font-fun">
      <h3 className="text-lg font-bold text-blue-700 mb-1">{evento.nombreDelEvento}</h3>
      <p className="text-gray-500 mb-4">Fecha: {evento.fechaDelEvento}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        <button className="btn-emerald" type="button" onClick={onVerDetalles} style={{ width: 'auto', padding: '0.4rem 1rem', fontSize: '0.95rem' }}>Ver detalles</button>
        <button className="btn-emerald" type="button" onClick={onAgregarGasto} style={{ width: 'auto', padding: '0.4rem 1rem', fontSize: '0.95rem' }}>Agregar gasto</button>
        <button className="btn-blue" type="button" onClick={onEditar} style={{ width: 'auto', padding: '0.4rem 1rem', fontSize: '0.95rem' }}>Editar evento</button>
        <button className="btn-danger" type="button" onClick={onEliminar} style={{ width: 'auto', padding: '0.4rem 1rem', fontSize: '0.95rem' }}>Eliminar evento</button>
      </div>
    </div>
  );
};

export default EventoCard; 