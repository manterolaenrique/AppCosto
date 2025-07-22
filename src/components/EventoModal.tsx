import React, { useState, useEffect } from 'react';
import { Evento } from '../context/EventoContext';
import '../app/ui.css';

interface EventoModalProps {
  abierto: boolean;
  onClose: () => void;
  evento?: Evento;
  onEditar?: (evento: Evento) => void;
}

const EventoModal: React.FC<EventoModalProps> = ({ abierto, onClose, evento, onEditar }) => {
  const [nombre, setNombre] = useState(evento?.nombreDelEvento || '');
  const [fecha, setFecha] = useState(evento?.fechaDelEvento || '');
  const [error, setError] = useState('');

  useEffect(() => {
    setNombre(evento?.nombreDelEvento || '');
    setFecha(evento?.fechaDelEvento || '');
    setError('');
  }, [abierto, evento]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !fecha) {
      setError('Todos los campos son obligatorios');
      return;
    }
    if (evento && onEditar) {
      onEditar({ ...evento, nombreDelEvento: nombre, fechaDelEvento: fecha });
    }
    setError('');
    onClose();
  };

  if (!abierto || !evento) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">×</button>
        <h2 className="modal-title">Editar evento</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="label">Nombre del evento <span className="text-danger">*</span></label>
            <input className="input" value={nombre} onChange={e => setNombre(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="label">Fecha del evento <span className="text-danger">*</span></label>
            <input type="date" className="input" value={fecha} onChange={e => setFecha(e.target.value)} required />
          </div>
          {error && <div className="text-danger text-sm mb-4 text-center">{error}</div>}
          <div className="flex gap-3">
            <button type="submit" className="btn-emerald btn-block">Guardar</button>
            <button type="button" className="btn-gray btn-block" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventoModal; 