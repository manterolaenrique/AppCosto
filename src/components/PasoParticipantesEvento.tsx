import React, { useState, useEffect } from 'react';
import { useEventoContext } from '../context/EventoContext';

const PasoParticipantesEvento: React.FC = () => {
  const { state, dispatch } = useEventoContext();
  const evento = state.eventoEnCreacion || {};
  const [nombres, setNombres] = useState(evento.participantes?.map(p => p.nombre) || []);
  const [compradorId, setCompradorId] = useState(evento.compradorId || '0');

  useEffect(() => {
    dispatch({ type: 'ACTUALIZAR_EVENTO_EN_CREACION', payload: {
      participantes: nombres.map((nombre, i) => ({ id: `${i}`, nombre, gastos: [] })),
      compradorId
    }});
  }, [nombres, compradorId, dispatch]);

  if (!evento.participantes) return null;

  const handleAgregarIntegrante = () => {
    setNombres(arr => [...arr, `Integrante ${arr.length + 1}`]);
  };

  const handleEliminarIntegrante = (idx: number) => {
    if (nombres.length > 1) {
      setNombres(arr => arr.filter((_, i) => i !== idx));
      if (compradorId === `${idx}`) {
        setCompradorId('0'); // Reset comprador si se elimina el seleccionado
      }
    }
  };

  return (
    <div>
      <div className="mb-4">
        <label className="label">Nombres de los participantes <span className="text-danger">*</span></label>
        <div className="space-y-2">
          {evento.participantes.map((p, idx) => (
            <div key={p.id} className="flex items-center gap-2">
              <input
                className="input"
                value={nombres[idx] || ''}
                onChange={e => setNombres(arr => arr.map((n, i) => i === idx ? e.target.value : n))}
                placeholder={`Integrante ${idx + 1}`}
                required
              />
              <input
                type="radio"
                name="comprador"
                checked={compradorId === p.id}
                onChange={() => setCompradorId(p.id)}
                className="checkbox-square"
                aria-label="Comprador principal"
              />
              <span className="text-xs">Comprador</span>
              {nombres.length > 1 && (
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700 text-xl font-bold ml-2"
                  onClick={() => handleEliminarIntegrante(idx)}
                  aria-label="Eliminar integrante"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button type="button" className="btn-emerald btn-block" onClick={handleAgregarIntegrante}>
            + Agregar integrante
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasoParticipantesEvento; 