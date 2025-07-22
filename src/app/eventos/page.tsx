"use client";
import React, { useState } from 'react';
import { useEventoContext } from '../../context/EventoContext';
import EventoList from '../../components/EventoList';
import EventoModal from '../../components/EventoModal';
import CrearEventoWizard from '../../components/CrearEventoWizard';
import { Evento } from '../../context/EventoContext';

const EventosDashboard: React.FC = () => {
  const { state, dispatch } = useEventoContext();
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState<Evento | null>(null);

  const handleNuevoEvento = () => {
    dispatch({ type: 'INICIAR_CREACION_EVENTO' });
  };

  const handleEditarEvento = (evento: Evento) => {
    setEventoSeleccionado(evento);
    setModalEditarAbierto(true);
  };

  const handleGuardarEdicion = (eventoEditado: Evento) => {
    dispatch({
      type: 'EDITAR_EVENTO',
      payload: eventoEditado,
    });
    setModalEditarAbierto(false);
    setEventoSeleccionado(null);
  };

  return (
    <div>
      <h1 className="title-main mb-8">Costeador de Eventos</h1>
      <div className="flex justify-center mb-6">
        <button
          className="btn-emerald btn-block"
          onClick={handleNuevoEvento}
        >
          + Nuevo evento
        </button>
      </div>
      <EventoList
        eventos={state.eventos}
        onEditar={handleEditarEvento}
      />
      {/* Wizard multi-step para crear evento */}
      {state.eventoEnCreacion && <CrearEventoWizard />}
      {/* Modal de edición simple */}
      <EventoModal
        abierto={modalEditarAbierto}
        onClose={() => setModalEditarAbierto(false)}
        evento={eventoSeleccionado || undefined}
        onEditar={handleGuardarEdicion}
      />
    </div>
  );
};

export default EventosDashboard; 