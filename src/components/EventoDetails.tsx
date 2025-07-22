import React from 'react';
import { Evento } from '../context/EventoContext';

interface EventoDetailsProps {
  evento: Evento;
}

const EventoDetails: React.FC<EventoDetailsProps> = ({ evento }) => {
  return (
    <div className="card w-full">
      <h2 className="title-section">{evento.nombreDelEvento}</h2>
      <p className="text-gray-600">Fecha: {evento.fechaDelEvento}</p>
      <h3 className="mt-4 mb-2 font-bold">Participantes</h3>
      <ul>
        {evento.participantes.map(participante => (
          <li key={participante.id}>
            {participante.nombre} - Gastos: $ {participante.gastos.reduce((acc, g) => acc + g.monto, 0)}
          </li>
        ))}
      </ul>
      {/* Aquí irá el total general y diferencia de saldos */}
    </div>
  );
};

export default EventoDetails; 