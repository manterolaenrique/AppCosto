import React, { useState } from 'react';
import { Evento } from '../context/EventoContext';
import EventoCard from './EventoCard';
import AddExpenseEventoModal from './AddExpenseEventoModal';
import { useEventoContext } from '../context/EventoContext';
import { useRouter } from 'next/navigation';

interface EventoListProps {
  eventos: Evento[];
  onEditar?: (evento: Evento) => void;
  children?: React.ReactNode;
}

const EventoList: React.FC<EventoListProps> = ({ eventos, onEditar, children }) => {
  const { dispatch } = useEventoContext();
  const router = useRouter();
  const [modalGastoAbierto, setModalGastoAbierto] = useState(false);

  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);
  const [eventoAEliminar, setEventoAEliminar] = useState<Evento | null>(null);

  const handleAgregarGasto = (evento: Evento) => {
    setModalGastoAbierto(true);
  };

  const handleEliminarEvento = (evento: Evento) => {
    setEventoAEliminar(evento);
    setModalEliminarAbierto(true);
  };

  const confirmarEliminarEvento = () => {
    if (eventoAEliminar) {
      dispatch({
        type: 'ELIMINAR_EVENTO',
        payload: eventoAEliminar.id,
      });
    }
    setModalEliminarAbierto(false);
    setEventoAEliminar(null);
  };



  const handleVerDetalles = (evento: Evento) => {
    router.push(`/eventos/${evento.id}`);
  };

  return (
    <div>
      <h2 className="title-section mb-4">Listado de Eventos</h2>
      {eventos.length === 0 ? (
        <div className="text-muted text-center">No hay eventos registrados aún.</div>
      ) : (
        <ul className="space-y-4">
          {eventos.map(evento => (
            <li key={evento.id}>
              <EventoCard
                evento={evento}
                onVerDetalles={() => handleVerDetalles(evento)}
                onAgregarGasto={() => handleAgregarGasto(evento)}
                onEditar={() => onEditar && onEditar(evento)}
                onEliminar={() => handleEliminarEvento(evento)}
              />
            </li>
          ))}
        </ul>
      )}
      {children}
      <AddExpenseEventoModal
        abierto={modalGastoAbierto}
        onClose={() => setModalGastoAbierto(false)}
      />
      {/* Modal de confirmación de eliminación */}
      {modalEliminarAbierto && (
        <div className="modal">
          <div className="modal-content text-center">
            <h2 className="modal-title">¿Eliminar evento?</h2>
            <p className="mb-4">¿Seguro que deseas eliminar el evento <b>{eventoAEliminar?.nombreDelEvento}</b>? Esta acción no se puede deshacer.</p>
            <div className="flex gap-3 justify-center">
              <button className="btn-danger btn-block" onClick={confirmarEliminarEvento}>Eliminar</button>
              <button className="btn-gray btn-block" onClick={() => setModalEliminarAbierto(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventoList; 