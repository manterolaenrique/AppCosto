import React from 'react';
import TripDetails from '../components/TripDetails';
import { Viaje } from '../context/TripContext';

// Simulación de viaje para base
const viajeEjemplo: Viaje = {
  id: '1',
  nombreDelViaje: 'Viaje a la playa',
  fechaDelViaje: '2024-07-01',
  integrantes: [
    { id: 'a', nombre: 'Ana', gastos: [] },
    { id: 'b', nombre: 'Luis', gastos: [] },
  ],
};

const TripPage: React.FC = () => {
  return (
    <div>
      <TripDetails viaje={viajeEjemplo} />
    </div>
  );
};

export default TripPage; 