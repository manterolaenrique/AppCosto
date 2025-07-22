import React, { useState, useEffect } from 'react';
import { useEventoContext } from '../context/EventoContext';

const PasoDatosBasicosEvento: React.FC = () => {
  const { state, dispatch } = useEventoContext();
  const evento = state.eventoEnCreacion || {};
  const [nombre, setNombre] = useState(evento.nombreDelEvento || '');
  const [fecha, setFecha] = useState(evento.fechaDelEvento || new Date().toISOString().slice(0, 10));
  const [cantidad, setCantidad] = useState(evento.participantes?.length || 1);
  const [error, setError] = useState('');

  useEffect(() => {
    dispatch({ type: 'ACTUALIZAR_EVENTO_EN_CREACION', payload: { nombreDelEvento: nombre, fechaDelEvento: fecha, participantes: Array.from({ length: cantidad }, (_, i) => ({ id: `${i}`, nombre: `Integrante ${i + 1}`, gastos: [] })) } });
  }, [nombre, fecha, cantidad]);

  useEffect(() => {
    setError('');
  }, [nombre, fecha, cantidad]);

  // Validación simple (puede usarse para bloquear avance en el wizard)
  useEffect(() => {
    if (!nombre.trim() || !fecha || cantidad < 1) {
      setError('Todos los campos son obligatorios');
    } else {
      setError('');
    }
  }, [nombre, fecha, cantidad]);

  return (
    <div>
      <div className="mb-4">
        <label className="label">Nombre del evento <span className="text-danger">*</span></label>
        <input className="input" value={nombre} onChange={e => setNombre(e.target.value)} required />
      </div>
      <div className="mb-4">
        <label className="label">Fecha del evento <span className="text-danger">*</span></label>
        <input type="date" className="input" value={fecha} onChange={e => setFecha(e.target.value)} required />
      </div>
      <div className="mb-4">
        <label className="label">Cantidad de participantes <span className="text-danger">*</span></label>
        <input type="number" min={1} className="input" value={cantidad} onChange={e => setCantidad(Number(e.target.value))} required />
      </div>
      {error && <div className="text-danger text-sm mb-2 text-center">{error}</div>}
    </div>
  );
};

export default PasoDatosBasicosEvento; 