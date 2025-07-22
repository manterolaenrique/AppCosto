"use client";
import React, { useState } from 'react';
import { Viaje, Gasto } from '../context/TripContext';
import TripCard from './TripCard';
import { useRouter } from 'next/navigation';
import AddExpenseModal from './AddExpenseModal';
import TripModal from './TripModal';
import { useTripContext } from '../context/TripContext';
import '../app/ui.css';

interface TripListProps {
  viajes: Viaje[];
  children?: React.ReactNode;
}

const TripList: React.FC<TripListProps> = ({ viajes, children }) => {
  const router = useRouter();
  const { dispatch } = useTripContext();
  const [modalGastoAbierto, setModalGastoAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [viajeSeleccionado, setViajeSeleccionado] = useState<Viaje | null>(null);
  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);
  const [viajeAEliminar, setViajeAEliminar] = useState<Viaje | null>(null);

  const handleAgregarGasto = (viaje: Viaje) => {
    setViajeSeleccionado(viaje);
    setModalGastoAbierto(true);
  };

  const handleEditarViaje = (viaje: Viaje) => {
    setViajeSeleccionado(viaje);
    setModalEditarAbierto(true);
  };

  const handleEliminarViaje = (viaje: Viaje) => {
    setViajeAEliminar(viaje);
    setModalEliminarAbierto(true);
  };

  const confirmarEliminarViaje = () => {
    if (viajeAEliminar) {
      dispatch({
        type: 'EDITAR_VIAJE', // Usar acción ELIMINAR_VIAJE si existe, si no, implementarla en el reducer
        payload: { ...viajeAEliminar, integrantes: [] }, // Temporal: vacía integrantes
      });
      dispatch({
        type: 'ELIMINAR_VIAJE',
        payload: viajeAEliminar.id,
      });
    }
    setModalEliminarAbierto(false);
    setViajeAEliminar(null);
  };

  const handleGuardarGasto = (gasto: Omit<Gasto, 'fotoComprobante'> & { fotoComprobante?: string }) => {
    if (viajeSeleccionado) {
      dispatch({
        type: 'AGREGAR_GASTO',
        payload: {
          viajeId: viajeSeleccionado.id,
          gasto: { ...gasto },
        },
      });
    }
    setModalGastoAbierto(false);
    setViajeSeleccionado(null);
  };

  const handleGuardarEdicion = (viajeEditado: Viaje) => {
    dispatch({
      type: 'EDITAR_VIAJE',
      payload: viajeEditado,
    });
    setModalEditarAbierto(false);
    setViajeSeleccionado(null);
  };

  return (
    <div className="font-fun">
      <h2 className="title-section mb-4">Listado de Viajes</h2>
      {viajes.length === 0 ? (
        <div className="text-muted text-center">No hay viajes registrados aún.</div>
      ) : (
        <ul className="space-y-4">
          {viajes.map(viaje => (
            <li key={viaje.id}>
              <TripCard
                viaje={viaje}
                onVerDetalles={() => router.push(`/viaje/${viaje.id}`)}
                onEditar={() => handleEditarViaje(viaje)}
                onAgregarGasto={() => handleAgregarGasto(viaje)}
                onEliminar={() => handleEliminarViaje(viaje)}
              />
            </li>
          ))}
        </ul>
      )}
      {children}
      <AddExpenseModal
        abierto={modalGastoAbierto}
        onClose={() => setModalGastoAbierto(false)}
        integrantes={viajeSeleccionado ? viajeSeleccionado.integrantes.map(i => ({ id: i.id, nombre: i.nombre })) : []}
        onGuardar={handleGuardarGasto}
      />
      <TripModal
        abierto={modalEditarAbierto}
        onClose={() => setModalEditarAbierto(false)}
        modo="editar"
        viaje={viajeSeleccionado || undefined}
        onEditar={handleGuardarEdicion}
      />
      {/* Modal de confirmación de eliminación */}
      {modalEliminarAbierto && (
        <div className="modal">
          <div className="modal-content text-center">
            <h2 className="modal-title">¿Eliminar viaje?</h2>
            <p className="mb-4">¿Seguro que deseas eliminar el viaje <b>{viajeAEliminar?.nombreDelViaje}</b>? Esta acción no se puede deshacer.</p>
            <div className="flex gap-3 justify-center">
              <button className="btn-danger btn-block" onClick={confirmarEliminarViaje}>Eliminar</button>
              <button className="btn-gray btn-block" onClick={() => setModalEliminarAbierto(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripList; 