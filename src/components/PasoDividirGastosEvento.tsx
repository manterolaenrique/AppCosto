import React, { useState, useEffect } from 'react';
import { useEventoContext } from '../context/EventoContext';

const PasoDividirGastosEvento: React.FC = () => {
  const { state, dispatch } = useEventoContext();
  const evento = state.eventoEnCreacion || {};
  const participantes = evento.participantes || [];
  const [montos, setMontos] = useState<number[]>(evento.montosIndividuales || participantes.map(() => 0));
  const [redondear, setRedondear] = useState(false);

  // Calcular el monto total como suma de los montos individuales
  const montoTotal = montos.reduce((acc, m) => acc + (Number(m) || 0), 0);

  useEffect(() => {
    dispatch({ type: 'ACTUALIZAR_EVENTO_EN_CREACION', payload: { montoTotal, montosIndividuales: montos } });
  }, [montoTotal, montos, dispatch]);

  const perPerson = participantes.length > 0 ? montoTotal / participantes.length : 0;
  const saldos = montos.map(m => perPerson - m);

  const handleRedondear = () => {
    setRedondear(r => !r);
  };

  if (!participantes.length) return null;

  return (
    <div>
      <div className="mb-4">
        <label className="label">Monto total del evento</label>
        <input type="number" className="input" value={montoTotal.toFixed(2)} readOnly tabIndex={-1} />
      </div>
      <div className="mb-4">
        <label className="label">Montos pagados por cada participante</label>
        <div className="space-y-2">
          {participantes.map((p, idx) => (
            <div key={p.id} className="flex items-center gap-2">
              <span className="w-32 text-black font-semibold">{p.nombre}</span>
              <input
                type="number"
                min={0}
                className="input"
                value={montos[idx] || ''}
                onChange={e => setMontos(arr => arr.map((m, i) => i === idx ? Number(e.target.value) : m))}
                required
              />
              <span className="text-sm font-bold">
                {saldos[idx] < 0 ? (
                  <span className="text-green-700">Debe recibir ${redondear ? Math.round(Math.abs(saldos[idx])) : Math.abs(saldos[idx]).toFixed(2)}</span>
                ) : saldos[idx] > 0 ? (
                  <span className="text-red-700">Debe pagar ${redondear ? Math.round(saldos[idx]) : saldos[idx].toFixed(2)}</span>
                ) : (
                  <span className="text-gray-600">Equilibrado</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-3 mb-4">
        <button type="button" className="btn-blue btn-block" onClick={handleRedondear}>
          {redondear ? 'Quitar redondeo' : 'Redondear'}
        </button>
      </div>
    </div>
  );
};

export default PasoDividirGastosEvento; 