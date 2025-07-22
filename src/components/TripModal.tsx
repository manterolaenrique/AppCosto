"use client";
import React, { useState } from 'react';
import { Viaje, Integrante } from '../context/TripContext';
import '../app/ui.css';

interface TripModalProps {
  abierto: boolean;
  onClose: () => void;
  modo: 'crear' | 'editar';
  viaje?: Viaje;
  onCrear?: (viaje: Omit<Viaje, 'id'>) => void;
  onEditar?: (viaje: Viaje) => void;
}

const TripModal: React.FC<TripModalProps> = ({ abierto, onClose, modo, viaje, onCrear, onEditar }) => {
  const [nombre, setNombre] = useState(viaje?.nombreDelViaje || '');
  const [fecha, setFecha] = useState(viaje?.fechaDelViaje || '');
  const [cantidad, setCantidad] = useState(viaje?.integrantes.length || 1);
  const [nombresIntegrantes, setNombresIntegrantes] = useState<string[]>(
    viaje?.integrantes.map(i => i.nombre) || ['']
  );
  const [error, setError] = useState('');

  // Actualizar nombres de integrantes al cambiar cantidad
  React.useEffect(() => {
    if (cantidad > nombresIntegrantes.length) {
      setNombresIntegrantes(prev => [...prev, ...Array(cantidad - prev.length).fill('')]);
    } else if (cantidad < nombresIntegrantes.length) {
      setNombresIntegrantes(prev => prev.slice(0, cantidad));
    }
  }, [cantidad]);

  const handleNombreIntegrante = (idx: number, value: string) => {
    setNombresIntegrantes(arr => arr.map((n, i) => (i === idx ? value : n)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !fecha || cantidad < 1 || nombresIntegrantes.some(n => !n.trim())) {
      setError('Todos los campos son obligatorios');
      return;
    }
    const integrantes: Integrante[] = nombresIntegrantes.map((nombre, idx) => ({
      id: `${Date.now()}_${idx}`,
      nombre,
      gastos: [],
    }));
    if (modo === 'crear' && onCrear) {
      onCrear({ nombreDelViaje: nombre, fechaDelViaje: fecha, integrantes });
    }
    if (modo === 'editar' && onEditar && viaje) {
      onEditar({ ...viaje, nombreDelViaje: nombre, fechaDelViaje: fecha, integrantes });
    }
    setError('');
    onClose();
  };

  if (!abierto) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">×</button>
        <h2 className="modal-title">{modo === 'crear' ? 'Nuevo viaje' : 'Editar viaje'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="label">Nombre del viaje <span className="text-danger">*</span></label>
            <input 
              className="input" 
              value={nombre} 
              onChange={e => setNombre(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="label">Fecha del viaje <span className="text-danger">*</span></label>
            <input 
              type="date" 
              className="input" 
              value={fecha} 
              onChange={e => setFecha(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="label">Cantidad de integrantes <span className="text-danger">*</span></label>
            <input 
              type="number" 
              min={1} 
              className="input" 
              value={cantidad} 
              onChange={e => setCantidad(Number(e.target.value))} 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="label">Nombres de los integrantes <span className="text-danger">*</span></label>
            <div className="space-y-2">
              {nombresIntegrantes.map((n, idx) => (
                <div key={idx}>
                  <input
                    className="input"
                    value={n}
                    onChange={e => handleNombreIntegrante(idx, e.target.value)}
                    placeholder={`Integrante ${idx + 1}`}
                    required
                  />
                </div>
              ))}
            </div>
          </div>
          {error && <div className="text-danger text-sm mb-4 text-center">{error}</div>}
          <div className="flex gap-3">
            <button type="submit" className="btn-emerald btn-block">
              {modo === 'crear' ? 'Crear' : 'Guardar'}
            </button>
            <button type="button" className="btn-gray btn-block" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TripModal; 