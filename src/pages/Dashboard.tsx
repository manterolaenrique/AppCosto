import React, { useState } from 'react';
import { useTripContext } from '../context/TripContext';
import TripList from '../components/TripList';
import TripModal from '../components/TripModal';
import { Viaje } from '../context/TripContext';
import '../app/ui.css';

const Dashboard: React.FC = () => {
  const { state, dispatch } = useTripContext();
  const [modalAbierto, setModalAbierto] = useState(false);

  const handleCrearViaje = (viaje: Omit<Viaje, 'id'>) => {
    dispatch({
      type: 'AGREGAR_VIAJE',
      payload: { ...viaje, id: Date.now().toString() },
    });
  };

  return (
    <div className="font-fun">
      <div className="flex justify-center mb-6">
        <button 
          className="btn-emerald btn-block" 
          onClick={() => setModalAbierto(true)}
        >
          + Nuevo viaje
        </button>
      </div>
      <TripList viajes={state.viajes} />
      <TripModal
        abierto={modalAbierto}
        onClose={() => setModalAbierto(false)}
        modo="crear"
        onCrear={handleCrearViaje}
      />
    </div>
  );
};

export default Dashboard; 