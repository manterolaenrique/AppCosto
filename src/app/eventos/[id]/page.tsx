"use client";
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useEventoContext } from '../../../context/EventoContext';
// import CrearEventoWizard from '../../../components/CrearEventoWizard';
import '../../ui.css';

const EventoDetallePage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { state, dispatch } = useEventoContext();
  const evento = params?.id ? state.eventos.find(e => e.id === params.id) : undefined;
  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);

  if (!evento) {
    return (
      <div className="min-h-screen bg-gradient-app flex flex-col items-center justify-center py-10 px-4 font-fun">
        <div className="card text-center">
          <h2 className="title-section text-red-600">Evento no encontrado</h2>
          <p className="text-muted mb-4">El evento que buscas no existe o ha sido eliminado.</p>
          <button className="btn-emerald" onClick={() => router.push('/')}>
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const participantes = evento.participantes || [];
  const montos = evento.montosIndividuales || participantes.map(() => 0);
  const montoTotal = evento.montoTotal || montos.reduce((acc, m) => acc + (Number(m) || 0), 0);
  const perPerson = participantes.length > 0 ? montoTotal / participantes.length : 0;
  const saldos = montos.map(m => perPerson - m);
  const comprador = participantes.find(p => p.id === evento.compradorId);

  // const handleEditar = () => {
  //   dispatch({ type: 'ACTUALIZAR_EVENTO_EN_CREACION', payload: { ...evento, id: evento.id } });
  //   dispatch({ type: 'RETROCEDER_PASO_CREACION' }); // Asegura que el paso sea 0
  //   dispatch({ type: 'RETROCEDER_PASO_CREACION' }); // Por si acaso
  //   setModoEdicion(true);
  // };

  const handleEliminar = () => {
    setModalEliminarAbierto(true);
  };

  const confirmarEliminar = () => {
    dispatch({ type: 'ELIMINAR_EVENTO', payload: evento.id });
    setModalEliminarAbierto(false);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-app flex flex-col items-center py-10 px-4 font-fun">
      <div className="w-full max-w-3xl flex flex-col items-center">
        <h1 className="title-main mb-8">{evento.nombreDelEvento}</h1>
        <div className="flex gap-3 mb-6">
          <button className="btn-danger" onClick={handleEliminar}>Eliminar evento</button>
        </div>
        <div className="card w-full mb-6">
          <div className="text-center mb-4">
            <h2 className="title-section">Detalles del Evento</h2>
            <p className="text-gray-600">Fecha: {evento.fechaDelEvento}</p>
            <p className="text-gray-600">Total: <span className="font-bold text-blue-700">${montoTotal.toFixed(2)}</span></p>
            {comprador && <p className="text-gray-600">Comprador principal: <span className="font-bold text-emerald-700">{comprador.nombre}</span></p>}
          </div>
        </div>
        <div className="card w-full mb-6">
          <h3 className="title-section">Participantes y Saldos</h3>
          <div className="space-y-4">
            {participantes.map((p, idx) => (
              <div key={p.id} className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-blue-700">{p.nombre}</h4>
                  <div className="text-sm text-gray-600">Pagó: <span className="font-semibold text-black">${montos[idx]?.toFixed(2)}</span></div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${
                    saldos[idx] < 0 ? 'text-green-600' : saldos[idx] > 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {saldos[idx] < 0 ? `Debe recibir $${Math.abs(saldos[idx]).toFixed(2)}` :
                     saldos[idx] > 0 ? `Debe pagar $${saldos[idx].toFixed(2)}` :
                     'Equilibrado'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="btn-blue btn-block mt-4" onClick={() => router.push('/')}>← Volver al Dashboard</button>
      </div>
      {/* Modal de confirmación de eliminación */}
      {modalEliminarAbierto && (
        <div className="modal">
          <div className="modal-content text-center">
            <h2 className="modal-title">¿Eliminar evento?</h2>
            <p className="mb-4">¿Seguro que deseas eliminar el evento <b>{evento.nombreDelEvento}</b>? Esta acción no se puede deshacer.</p>
            <div className="flex gap-3 justify-center">
              <button className="btn-danger btn-block" onClick={confirmarEliminar}>Eliminar</button>
              <button className="btn-gray btn-block" onClick={() => setModalEliminarAbierto(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
      {/* Wizard de edición - Comentado temporalmente */}
      {/* {modoEdicion && <CrearEventoWizard />} */}
    </div>
  );
};

export default EventoDetallePage; 